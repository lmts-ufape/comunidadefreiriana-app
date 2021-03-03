import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text, TextInput, TouchableOpacity, Picker, Alert, Platform, Image, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Organization {
  id:number;
  nome:string;
  email:String;
  telefone:number;
  cidade:String;
  estado:String;
  pais:String;
  endereco:String;
  cep:String;
  site:String;
  coodenador:String;
  dataFundacao: Date;
  info:String;
  latitude:number;
  longitude:number;
  images: Array<{
    id:number;
    url:string;
  }>;
}

interface ImageI {
  cancelled: boolean;
  height: number;
  width: number;
  type: string;
  uri: string;
}

export default function OrganizationData() {

  const [categoria, setcategoria] = useState('Instituto');
  const [nome, setnome] = useState('');
  const [email, setemail] = useState('');
  const [telefones, settelefones] = useState('');
  const [cidade, setcidade] = useState('');
  const [estado, setestado] = useState('');
  const [pais, setpais] = useState('');
  const [endereco, setendereco] = useState('');
  const [cep, setcep] = useState('');
  const [site, setsite] = useState('');
  const [coordenador, setCoordenador] = useState('');
  const [dataFundacao, setdataFundacao] = useState(new Date(2000,11,17));
  const [DatadeRealizacao, setsetDatadeRealizacao] = useState(new Date(2000,11,17));
  const [NomedaRealizacao, setNomedaRealizacao] = useState('');
  const [info, setinfo] = useState('');
  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');
  const [images, setimages] = useState<ImageI>({
    cancelled: false,
    height: 0,
    width: 0,
    type: '',
    uri: '',
  });

  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [showReal, setShowReal] = useState(false);

  useEffect(()=>{
    
    
},[]);
  
  function validate() {
    if (
      nome === '' ||
      email === '' ||
      telefones === '' ||
      cidade === '' ||
      estado === '' ||
      pais === '' ||
      endereco === '' ||
      cep === '' ||
      site === '' || 
      coordenador === '' || 
      dataFundacao.toString() === '' ||
      DatadeRealizacao.toString() === '' || 
      NomedaRealizacao === '' || 
      info === '' || 
      images.uri === ''
      ) {
        return false;
    } else {
      return true;
    }
  }

  async function handleCreateOrphanage() {
    if(!validate()){
      Alert.alert('Ops!', 'Por favor, preencha todos os campos!');
      return false;
    }
    
    const form = new FormData();

    // Permissão para localização
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    // Converte endereço em Lat e Long
    const response = await Location.geocodeAsync(`${endereco} ${estado} ${cidade} ${pais}`)
    const lat = response[0].latitude;
    const long = response[0].longitude;
    if (!response) {
      Alert.alert('Endereço não encontrado!');
      return
    }
    
    var photo = {
      uri: images.uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    };

    try {
      form.append('nome', nome);
      form.append('categoria', categoria);
      form.append('pais', pais);
      form.append('estado', estado);
      form.append('cidade', cidade);
      form.append('endereco', endereco);
      form.append('cep', String(cep));
      form.append('telefones', String(telefones));
      form.append('email', email);
      form.append('site', site);
      form.append('coordenador', coordenador);
      form.append('datafundacao', String(dataFundacao));
      form.append('DatadeRealizacao', String(DatadeRealizacao));
      form.append('NomedaRealizacao', NomedaRealizacao);
      form.append('info', info);
      form.append('latitude', String(lat));
      form.append('longitude', String(long));
      form.append('images', photo);
      console.log('result');

      const result = await api.post('/pfs', form);
      console.log(result.data);

      api.post('/sendEmail', {id: result.data.id, email: result.data.email});

      Alert.alert(
        "Requisição enviada!",
        "Por favor, confirme o email que enviamos para você.",
        [
          { text: "OK", onPress: () => navigation.goBack() }
        ],
        { cancelable: false }
      );

    } catch (result) {
      alert('erro');
      console.log(result);
    }
  }

  async function handleCategoria(valor: any){
    //setcep(cep);
    await setcategoria(valor);
  }

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || dataFundacao;
    setShow(Platform.OS === 'ios');
    setdataFundacao(currentDate);
  };

  const onChangeReal = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || dataFundacao;
    setShowReal(Platform.OS === 'ios');
    setsetDatadeRealizacao(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const showDatepickerReal = () => {
    setShowReal(true);
  };

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted') {
      alert('Eita! Precisamos de acesso às suas fotos...');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    //setimages(result.data);
    console.log(result);
  }

  const pickImage = async () => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted') {
      alert('Eita! Precisamos de acesso às suas fotos...');
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setimages(result);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>

      <Text style={styles.label}>Seu e-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="joao@exemplo.com"
        value={email}
        onChangeText={setemail}
        keyboardType='email-address'
      />

      <Text style={styles.title}>Dados da Instituição</Text>

      <Text style={styles.label}>Nome/Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Instituto PF"
        value={nome}
        onChangeText={setnome}
      />

      {/* <Text style={styles.label}>Categoria</Text>
      <Picker 
        style={styles.label} 
        selectedValue={categoria} 
        onValueChange={
          (itemValor, itemIndex) => {
            console.log('item', itemValor)
            handleCategoria(itemValor)
            console.log('categoria', categoria)
          }
      }>
        <Picker.Item label="Cátedrais Paulo Freire" value="Cátedrais Paulo Freire"/>
        <Picker.Item label="Instituto Paulo Freire" value="Instituto Paulo Freire"/>
        <Picker.Item label="Centros e Núcleos de Estudos e Pesquisas" value="Centros e Núcleos de Estudos e Pesquisas"/>
        <Picker.Item label="Homenagens" value="Homenagens"/>
        <Picker.Item label="Projetos" value="Projetos"/>


      </Picker> */}

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={styles.input}
        placeholder="87 9999 6666"
        value={`${telefones}`}
        onChangeText={settelefones}
        keyboardType='numeric'
      />

      <Text style={styles.label}>País</Text>
      <TextInput
        style={styles.input}
        placeholder="Brasil"
        value={pais}
        onChangeText={setpais}
      />

      <Text style={styles.label}>Estado</Text>
      <TextInput
        style={styles.input}
        placeholder="Pernambuco"
        value={estado}
        onChangeText={setestado}
      />

      <Text style={styles.label}>Cidade</Text>
      <TextInput
        style={styles.input}
        placeholder="Garanhuns"
        value={cidade}
        onChangeText={setcidade}
      />

      <Text style={styles.label}>Endereço</Text>
      <TextInput
        style={styles.input}
        placeholder="Rua Gomes"
        value={endereco}
        onChangeText={setendereco}
      />

      <Text style={styles.label}>CEP</Text>
      <TextInput
        style={styles.input}
        placeholder="123456 000"
        value={`${cep}`}
        onChangeText={setcep}
        keyboardType='numeric'
      />

      <Text style={styles.label}>Site</Text>
      <TextInput
        style={styles.input}
        placeholder="paulofreire.com.br"
        value={site}
        onChangeText={setsite}
        keyboardType='url'
      />

      <Text style={styles.label}>Data da Fundação</Text>
      <View style={{flexDirection: 'row', flex: 1}}>
        <TextInput
          style={styles.inputDate}
          placeholder={`${((dataFundacao.getDate() )) + "/" + ((dataFundacao.getMonth() + 1)) + "/" + dataFundacao.getFullYear()}`}
          editable={false}
        />
        <TouchableOpacity style={styles.dateButton} onPress={showDatepicker}>
          <Feather name="calendar" size={24} color="#15B6D6" />
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dataFundacao}
          mode={"date"}
          display="default"
          is24Hour={true}
          onChange={onChange}
          locale="pt_BR"
        />
      )}

      <Text style={styles.label}>Nome da Realização</Text>
      <TextInput
        style={styles.input}
        placeholder="Instituto"
        value={NomedaRealizacao}
        onChangeText={setNomedaRealizacao}
      />

      <Text style={styles.label}>Data da Realização</Text>
      <View style={{flexDirection: 'row', flex: 1}}>
        <TextInput
          style={styles.inputDate}
          placeholder={`${((DatadeRealizacao.getDate() )) + "/" + ((DatadeRealizacao.getMonth() + 1)) + "/" + DatadeRealizacao.getFullYear()}`}
          editable={false}
        />
        <TouchableOpacity style={styles.dateButton} onPress={showDatepickerReal}>
          <Feather name="calendar" size={24} color="#15B6D6" />
        </TouchableOpacity>
      </View>
      {showReal && (
        <DateTimePicker
          testID="dateTimePicker"
          value={DatadeRealizacao}
          mode={"date"}
          display="default"
          is24Hour={true}
          onChange={onChangeReal}
        />
      )}

      <Text style={styles.label}>Coordenador</Text>
      <TextInput
        style={styles.input}
        placeholder="Joao Silva"
        value={coordenador}
        onChangeText={setCoordenador}
      />

      <Text style={styles.label}>Foto</Text>
      {images.uri ? 
        <>
          <Image 
          style={styles.image} 
          source={{ uri: images.uri }}/>
          <TouchableOpacity style={styles.deleteImage} onPress={() => {setimages({})}}>
            <Feather name="trash" size={24} color="red" />
          </TouchableOpacity>
        </>
        :
        <TouchableOpacity style={styles.imagesInput} onPress={pickImage}>
          <Feather name="plus" size={24} color="#15B6D6" />
        </TouchableOpacity>
      }

      <Text style={styles.label}>Mais Informações</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={info}
        onChangeText={setinfo}
      />
      {validate() ? 
        <RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
          <Text style={styles.nextButtonText}>Enviar</Text>
        </RectButton>
      :
      <View style={styles.nextButtonDisabled}>
        <Text style={styles.nextButtonText}>Enviar</Text>
      </View>
      }
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
    paddingTop: 24,
    borderTopWidth: 0.8,
    borderTopColor: '#D3E2E6',
    alignSelf: 'center',
  },

  label: {
    color: '#000000',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  image: {
    width: Dimensions.get('window').width - 40,
    height: 180,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 15,
  },

  
  picker: {
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 2,
    height: 56,
    padding: 18,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  dateButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    marginLeft: 5
  },

  deleteImage: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: 'red',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
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
    padding: 18,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  inputDate: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 2,
    height: 56,
    padding: 18,
    marginBottom: 16,
    textAlignVertical: 'top',
    width: '85%'
  },

  nextButton: {
    backgroundColor: '#2dc200',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonDisabled: {
    backgroundColor: '#777',
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