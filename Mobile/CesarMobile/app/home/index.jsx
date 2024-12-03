import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { Link } from "expo-router";

const PiratefyHome = () => {
  const [artistas, setArtistas] = useState([]);
  const [albuns, setAlbuns] = useState([]);
  const [musicas, setMusicas] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [musicaSelecionada, setMusicaSelecionada] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    const musicasMock = [
      { id: 1, nome: "Afinar as Rezas", imageUrl: "https://www.vagalume.com.br/dazaranha/discografia/afinar-as-rezas.webp", artista: "Dazaranha" },
      { id: 2, nome: "Muito Orgulho, Meu Pai", imageUrl: "https://cdn-images.dzcdn.net/images/cover/0ee5a87c4ad432b094c0521d8c455616/0x1900-000000-80-0-0.jpg", artista: "Gabriel O Pensador" },
      { id: 3, nome: "A Amizade", imageUrl: "https://i.scdn.co/image/ab67616d0000b273368b255cf9d62af7006b01a5", artista: "Grupo Fundo de Quintal" },
    ];

    const artistasMock = [
      { id: 1, nome: "Dazaranha", imageUrl: "https://sucoaquino.com.br/dazaranha_marrom.jpg" },
      { id: 2, nome: "Tihuana", imageUrl: "https://i.scdn.co/image/ab67616d0000b273b4c12f1b2e3073039bf422b0" },
      { id: 3, nome: "O Rappa", imageUrl: "https://images-americanas.b2w.io/produtos/2612428411/imagens/cd-o-rappa-perfil/2612428411_1_large.jpg" },
    ];

    const albunsMock = [
      { id: 1, nome: "Dazaranha", imageUrl: "https://i.scdn.co/image/ab67616d0000b273830c49c3d660717c56019cd9", artista: "Dazaranha" },
      { id: 2, nome: "Djavan Ao Vivo", imageUrl: "https://djavan.com.br/content/uploads/2018/11/ao_vivo.jpg", artista: "Djavan" },
      { id: 3, nome: "Maicou Douglas Syndrome", imageUrl: "https://i1.sndcdn.com/artworks-b6bc3187-2be8-45bd-ae3d-d76375ea5d9e-0-t500x500.jpg", artista: "Comunidade Nin-Jitsu" },
    ];

    setMusicas(musicasMock);
    setArtistas(artistasMock);
    setAlbuns(albunsMock);
  }, []);

  const renderCards = (items) => {
    return items.map((item) => (
      <div key={item.id} style={styles.card} onClick={() => setMusicaSelecionada(item)}>
        <img src={item.imageUrl} alt={item.nome} style={styles.image} />
        <p style={styles.text}>{item.nome}</p>
      </div>
    ));
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.appName}>Piratefy</h1>
        <div style={styles.profileIcon}>
          <Link href="../perfil">
            <img
              src="./assets/images/user.png"
              alt="Profile"
              style={styles.profileImage}
            />
          </Link>
        </div>
      </header>
      <ScrollView style={styles.main}>
        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Search songs..."
            style={styles.searchInput}
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Songs</h2>
          <div style={styles.horizontalList}>
            {musicas.map((musica) => (
              <div
                key={musica.id}
                style={styles.card}
                onClick={() => setMusicaSelecionada(musica)}
              >
                <img src={musica.imageUrl} alt={musica.nome} style={styles.image} />
                <p style={styles.text}>{musica.nome}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Albums</h2>
          <div style={styles.horizontalList}>{renderCards(albuns)}</div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Artists</h2>
          <div style={styles.horizontalList}>{renderCards(artistas)}</div>
        </div>
      </ScrollView>

      {musicaSelecionada && (
        <div style={styles.player}>
          <div style={styles.playerContent}>
            <img
              src={musicaSelecionada.imageUrl}
              alt={musicaSelecionada.nome}
              style={styles.playerImage}
            />
            <div>
              <p style={styles.playerSongName}>{musicaSelecionada.nome}</p>
              <p style={styles.playerArtistName}>Artist: {musicaSelecionada.artista}</p>
            </div>
          </div>
          <div style={styles.controls}>
            <button onClick={togglePlayPause} style={styles.playButton}>
              {isPlaying ? "Pause" : "Play"}
            </button>
            <div style={styles.volumeControl}>
              <label htmlFor="volume" style={styles.volumeLabel}>
                Volume
              </label>
              <input
                type="range"
                id="volume"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                style={styles.volumeSlider}
              />
              <span>{volume}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#000000", // Fundo preto
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    overflow: "hidden",
  },
  header: {
    position: "fixed", // Fixa o header no topo
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#D3E70A", // Verde solicitado
    padding: "20px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10, // Garante que ele fique na frente do conteúdo
  },
  appName: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "bold",
    color: "#000", // Texto no header em preto
  },
  profileIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    overflow: "hidden",
    cursor: "pointer",
    marginRight: "30px",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  main: {
    flex: 1,
    padding: "20px",
    textAlign: "center",
    width: "100%",
    marginTop: "100px",
  },
  searchContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "30px",
  },
  searchInput: {
    width: "90%",
    maxWidth: "500px",
    padding: "15px",
    borderRadius: "25px",
    border: "none",
    outline: "none",
    backgroundColor: "#1e1e1e",
    color: "#fff",
    fontSize: "16px",
    textAlign: "center",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
    marginBottom: "20px",
  },
  searchButton: {
    padding: "10px 20px",
    borderRadius: "20px",
    border: "none",
    backgroundColor: "#D3E70A", // Verde solicitado
    color: "#000",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.2s ease",
  },
  section: {
    marginBottom: "30px",
  },
  sectionTitle: {
    fontSize: "24px",
    marginBottom: "10px",
    color: "#D3E70A", // Verde solicitado
    borderBottom: "2px solid #D3E70A",
    display: "inline-block",
  },
  horizontalList: {
    display: "flex",
    overflowX: "auto",
    paddingBottom: "10px",
    justifyContent: "center",
  },
  card: {
    marginRight: "15px",
    textAlign: "center",
    backgroundColor: "#1e1e1e",
    borderRadius: "8px",
    padding: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
    cursor: "pointer",
  },
  image: {
    width: "120px",
    height: "120px",
    borderRadius: "8px",
    objectFit: "cover",
    marginBottom: "10px",
  },
  text: {
    fontSize: "16px",
    color: "#D3E70A", // Verde solicitado para títulos
    fontWeight: "bold",
  },
  player: {
    position: "fixed",
    bottom: "0",
    width: "100%",
    backgroundColor: "#121212", // Fundo mais escuro no player
    padding: "20px",
    borderTop: "2px solid #D3E70A",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: "10",
  },
  playerContent: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  playerImage: {
    width: "60px",
    height: "60px",
    borderRadius: "8px",
    marginRight: "15px",
    objectFit: "cover",
  },
  playerSongName: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#fff", // Texto branco no player
  },
  playerArtistName: {
    fontSize: "14px",
    color: "#b3b3b3", // Texto cinza no player
  },
  controls: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  playButton: {
    padding: "10px 20px",
    backgroundColor: "#D3E70A", // Verde solicitado para o botão de play/pause
    border: "none",
    borderRadius: "20px",
    color: "#000", // Texto do botão preto
    fontSize: "16px",
    cursor: "pointer",
    marginBottom: "15px",
  },
  volumeControl: {
    display: "flex",
    alignItems: "center",
  },
  volumeLabel: {
    marginRight: "10px",
    color: "#fff",
  },
  volumeSlider: {
    marginRight: "10px",
    width: "200px",
  },
};


export default PiratefyHome;
