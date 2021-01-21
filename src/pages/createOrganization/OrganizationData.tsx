import React ,{useEffect, useState} from 'react';
import { ScrollView, View, StyleSheet, Text, TextInput, Picker } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export default function OrganizationData() {

  const [category, setCategory] = useState();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>


      <Text style={styles.label}>Nome/Título</Text>
      <TextInput
        style={styles.input}
      />

      <Picker 
        style={styles.label} 
        selectedValue={category} 
        onValueChange={
          (itemValor, itemIndex) =>
            setCategory(
              itemValor
            )
      }>
        <Picker.Item label="Categoria" value=""/>
        <Picker.Item label="Cátedrais Paulo Freire" value="Cátedrais Paulo Freire"/>
        <Picker.Item label="Instituto Paulo Freire" value="Instituto Paulo Freire"/>
        <Picker.Item label="Centros e Núcleos de Estudos e Pesquisas" value="Centros e Núcleos de Estudos e Pesquisas"/>
        <Picker.Item label="Homenagens" value="Homenagens"/>
        <Picker.Item label="Projetos" value="Projetos"/>


      </Picker>

      <Text style={styles.label}>País</Text>
      <TextInput
        style={styles.input}
      />

      <Text style={styles.label}>Estado</Text>
      <TextInput
        style={styles.input}
      />

      <Text style={styles.label}>Cidade</Text>
      <TextInput
        style={styles.input}
      />

      <Text style={styles.label}>Endereço</Text>
      <TextInput
        style={styles.input}
      />

      <Text style={styles.label}>CEP</Text>
      <TextInput
        style={styles.input}
      />

      <Text style={styles.label}>Telefone(s)-(Opcional)</Text>
      <TextInput
        style={styles.input}
      />

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
      />

      <Text style={styles.label}>Site - (Opcional)</Text>
      <TextInput
        style={styles.input}
      />

      <Text style={styles.label}>Coordenador</Text>
      <TextInput
        style={styles.input}
      />

      <Text style={styles.label}>Data da realização</Text>
      <TextInput
        style={styles.input}
      />

      <Text style={styles.label}>Mais Informações</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
      />

      <RectButton style={styles.nextButton} onPress={() => {}}>
        <Text style={styles.nextButtonText}>Salvar</Text>
      </RectButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#000000',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  label: {
    color: '#000000',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 2,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  nextButton: {
    backgroundColor: '#2dc200',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})