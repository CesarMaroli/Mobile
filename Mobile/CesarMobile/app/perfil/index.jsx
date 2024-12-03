import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

const Perfil = () => {
  // Dados do usuário (poderia vir de um estado ou de uma API)
  const usuario = {
    nome: "César Maroli",
    descricao:
      "Adoro música e estou sempre descobrindo novas faixas e artistas! Minhas playlists são meu refúgio.",
      fotoPerfil: "./assets/images/user1.png", // Caminho da imagem ajustado para React Native
    playlists: [
      { nome: "Reggae", quantidadeMusicas: 20 },
      { nome: "MPB", quantidadeMusicas: 15 },
      { nome: "Rock", quantidadeMusicas: 25 },
    ],
  };

  const logout = () => {
    // Aqui você pode adicionar a lógica para o logout
    console.log("Usuário deslogado!");
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho do perfil */}
      <View style={styles.header}>
        <Image
          source={usuario.fotoPerfil}
          style={styles.profileImage}
          resizeMode="cover"
        />
        <Text style={styles.profileName}>{usuario.nome}</Text>
        <Text style={styles.profileDescription}>{usuario.descricao}</Text>
      </View>

      {/* Seção de playlists */}
      <View style={styles.playlistSection}>
        <Text style={styles.playlistTitle}>Playlists</Text>
        {usuario.playlists.map((playlist, index) => (
          <View key={index} style={styles.playlistItem}>
            <Text style={styles.playlistName}>{playlist.nome}</Text>
            <Text style={styles.playlistCount}>
              {playlist.quantidadeMusicas} músicas
            </Text>
          </View>
        ))}
      </View>

      {/* Rodapé com botão de logout */}
      <View style={styles.footer}>
        <Link href="/home">
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutButtonText}>Sair</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default Perfil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Preto típico de aplicativos de música
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75, // Faz a imagem ficar redonda
    marginBottom: 20,
  },
  profileName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  profileDescription: {
    fontSize: 18,
    color: "#ccc",
    marginTop: 10,
    textAlign: "center",
  },
  playlistSection: {
    marginTop: 40,
    width: "100%",
  },
  playlistTitle: {
    fontSize: 24,
    color: "#1db954", // Verde típico do Spotify
    marginBottom: 10,
    textAlign: "center",
  },
  playlistItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  playlistName: {
    fontSize: 18,
    color: "#fff",
  },
  playlistCount: {
    fontSize: 18,
    color: "#ccc",
  },
  footer: {
    marginTop: 30,
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#1db954",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

 // 