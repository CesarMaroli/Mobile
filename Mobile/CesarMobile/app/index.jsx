import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { AppContext } from '../scripts/userContext'; 

export default function Login() {
  const [data, setData] = useState({
    email: '',
    senha: ''
  });
  const { updateUser } = useContext(AppContext);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch('API_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        }),
      });
  
      const catchMessage = await response.json();
  
      if (response.ok) {
        const { userData } = catchMessage; 
        updateUser({
          nome: userData.nome,
          sobreNome: userData.sobrenome,
          email: userData.email, 
          dataNascimento: userData.dataNascimento,
          senha: data.senha, 
        });
        router.push('/home'); 
      } else {
        alert(catchMessage.message || 'Erro ao fazer login');
      }
    } catch (error) {
      console.log(error);
      alert('Erro ao conectar ao servidor');
    } finally {
      router.push('/home'); 
    }
  };
  return (
    <View style={style.container}>
      <Image
        style={style.logoLogin}
        source={require("../assets/images/1.png")}
      />
      <View style={style.form}>
        <View style={style.inputContainer}>
          <Text style={style.label}>Email</Text>
          <TextInput
            style={style.input}
            keyboardType="email-address"
            placeholder="E-mail"
            value={data.email}
            onChangeText={(valor) => { setData({ ...data, email: valor }) }}
          />
        </View>
        <View style={style.inputContainer}>
          <Text style={style.label}>Senha</Text>
          <TextInput
            secureTextEntry={true}
            style={style.input}
            placeholder="Senha"
            value={data.senha}
            onChangeText={(valor) => { setData({ ...data, senha: valor }) }}
          />
        </View>
        <Text style={style.label}>
          Não possui cadastro? <Link href="./cadastro"><Text style={style.link}>Cadastre-se Agora</Text></Link>
        </Text>
        <Pressable onPress={handleLogin} style={style.botao}>
          <Text style={style.botaoText}>Entrar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  
    alignItems: 'center',
    backgroundColor: '#000',  
    padding: 20,
  },
  logoLogin: {
    resizeMode: 'cover',
    width: 350,
    height: 250,
    marginBottom: 40,
  },
  form: {
    width: '80%',  
    display: "flex",
    flexDirection: "column",
    alignItems: 'center',
    rowGap: 20,
  },
  input: {
    height: 45,
    margin: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#FFF',
    fontSize: 14,
  },
  link: {
    color: "#D3E70A",  
    textDecorationLine: "underline"
  },
  label: {
    marginLeft: 12,
    color: "#FFF",  
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: '100%',
  },
  botao: {
    backgroundColor: '#D3E70A',  
    borderRadius: 20,
    textAlign: 'center',
    paddingVertical: 12,
    color: '#000',  
    width: '100%',  
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'center',  
  },
  botaoText: {
    color: '#000',  
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
