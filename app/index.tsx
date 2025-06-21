import React, { useState, useEffect } from 'react';
import { FlatList, TextInput, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { getDados } from './lib/api/dados';

export default function App() {
  const [busca, setBusca] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    getDados()
      .then(setData)
      .catch(() => setErro('Erro ao carregar dados'))
      .finally(() => setLoading(false));
  }, []);

  const resultados = data.filter((item) =>
    (item.grupo?.toLowerCase() || '').includes(busca.toLowerCase()) ||
    (item.composicao?.toString() || '').includes(busca) ||
    (item.insumo?.toString() || '').includes(busca) ||
    (item.descricao?.toLowerCase() || '').includes(busca.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red' }}>{erro}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar por grupo, código ou descrição"
        value={busca}
        onChangeText={setBusca}
        style={styles.input}
      />
      <FlatList
        data={resultados}
        keyExtractor={(_, index) => index.toString()} 
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.composicao}-{item.descricao}</Text>
            <Text>Cód. Item: {item.insumo}</Text>
            <Text>Grupo: {item.grupo}</Text>
            <Text>Unidade: {item.unidade}</Text>
            <Text>Coeficiente: {item.coeficiente}</Text>
            <Text>Custo: {item.custo}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>Nenhum item encontrado.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 10, padding: 8
  },
  card: {
    backgroundColor: '#f0f0f0', padding: 10, borderRadius: 5, marginBottom: 10
  },
  title: { fontWeight: 'bold' }
});
