import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, Image, SafeAreaView } from 'react-native';
import axios from 'axios';
import { Buffer } from 'buffer';

export default function App() {
  const imageUrls = [
    'https://images.pexels.com/photos/3533228/pexels-photo-3533228.png',
    'https://images.pexels.com/photos/4029925/pexels-photo-4029925.jpeg',
    'https://images.pexels.com/photos/5199158/pexels-photo-5199158.jpeg',
    'https://images.pexels.com/photos/4754648/pexels-photo-4754648.jpeg',
    'https://images.pexels.com/photos/2922450/pexels-photo-2922450.jpeg',
    'https://images.pexels.com/photos/4075524/pexels-photo-4075524.png',
    'https://images.pexels.com/photos/5852981/pexels-photo-5852981.jpeg',
  ];

  const [images, setImages] = useState([]);
  useEffect(() => {
    const fetchImage = async (url) => {
      try {
        const response = await axios.get(url, {
          headers: {},
          responseType: 'arraybuffer',
        });

        function arrayBufferToBase64(buffer) {
          const binary = Buffer.from(buffer);
          const base64String = binary.toString('base64');
          return base64String;
        }

        const imageBase64 = arrayBufferToBase64(response.data);

        const imageStr = `data:image/jpeg;base64,${imageBase64}`;

        setImages((prevImages) => [...prevImages, imageStr]);
      } catch (error) {
        console.log('Error:', error);
        console.log('Error response:', error.response);
      }
    };

    imageUrls.forEach((url) => {
      fetchImage(url);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Buffer Images example</Text>

      <StatusBar style="auto" />

      {images.map((image, index) => (
        <Image key={index} source={{ uri: image }} style={styles.image} />
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 100,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginBottom: 20,
  },
});
