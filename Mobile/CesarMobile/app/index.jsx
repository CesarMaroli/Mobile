import React from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { Link } from "expo-router";
import { router } from "expo-router";

const Login = () => {
    const [email, setEmail] = React.useState("");
    const [senha, setSenha] = React.useState("");

    const fazerLogin = async () => {
        console.log(email);
        if (!email || !senha) {
            alert("Preencha todos os campos corretamente");
            return;
        }
        try {
            const resposta = await fetch('http://localhost:8000/autenticacao/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });
            
            if (resposta.status === 200) {
                router.replace('./home');
            } else if (resposta.status === 409) {
                alert("Email já cadastrado");
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SpotFake</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Escreva seu email"
                    placeholderTextColor="#B3B3B3"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setSenha}
                    value={senha}
                    placeholder="Escreva sua senha"
                    placeholderTextColor="#B3B3B3"
                    secureTextEntry
                />
                <Text style={styles.registerText}>
                    Não tem uma conta? Cadastre-se aqui
                </Text>
            </View>

            <Link href={'./cadastro'} style={styles.linkButton}>
                <Text style={styles.buttonText}>Cadastro</Text>
            </Link>
            <Pressable style={styles.button} onPress={fazerLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 36,
        color: '#1DB954',
        marginBottom: 30,
        fontWeight: 'bold',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        borderColor: '#B3B3B3',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginTop: 15,
        backgroundColor: '#282828',
        color: '#FFFFFF',
    },
    registerText: {
        color: '#B3B3B3',
        textAlign: 'center',
        marginVertical: 15,
    },
    linkButton: {
        backgroundColor: 'transparent',
        borderColor: '#1DB954',
        borderWidth: 1,
        borderRadius: 50,
        paddingVertical: 12,
        paddingHorizontal: 30,
        marginTop: 10,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#1DB954',
        borderRadius: 50,
        paddingVertical: 12,
        paddingHorizontal: 30,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Login;
