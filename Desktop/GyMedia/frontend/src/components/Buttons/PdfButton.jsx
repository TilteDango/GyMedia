import React from "react";
import {
  pdf,
  Document,
  Page,
  View,
  Text,
  Image as PDFImage,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: "1cm",
  },
  title: {
    fontSize: 24,
    marginBottom: "0.5cm",
    textAlign: "center",
  },
  category: {
    backgroundColor: "green",
    color: "white",
    padding: "0.2cm",
    borderRadius: "4px",
    alignSelf: "center",
  },
  description: {
    marginBottom: "0.5cm",
    textAlign: "justify",
    fontSize: 14,
  },
  image: {
    width: "100%",
    height: "auto",
    marginBottom: "0.5cm",
    maxHeight: "50%",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: "0.2cm",
  },
  ingredient: {
    marginLeft: "1cm",
  },
  instruction: {
    marginLeft: "1cm",
  },
});

function PDFButton({ diet }) {
  const {
    img,
    username,
    category,
    title,
    description,
    stars,
    reviews,
    liked,
    _id,
    created,
    steps,
    ingredients,
  } = diet;
  const generatePDF = async () => {
    const MyDocument = () => (
      <Document>
        <Page style={styles.page}>
          <View>
            <PDFImage src={img} alt="Avocado" style={styles.image} />
            <View id="downloadable">
              <View style={styles.title}>
                <Text>{title}</Text>
                <Text style={styles.category}>{category}</Text>
              </View>
              <View style={styles.description}>
                <Text>{description}</Text>
              </View>
              <View>
                <Text style={styles.sectionTitle}>Ingredientes:</Text>
                {ingredients.map((ingredient, index) => (
                  <Text
                    key={index}
                    style={styles.ingredient}
                  >{`${ingredient.quantity} ${ingredient.unity} de ${ingredient.name}`}</Text>
                ))}
              </View>
              <View>
                <Text style={styles.sectionTitle}>Instrucciones:</Text>
                {steps.map((step, index) => (
                  <Text key={index} style={styles.instruction}>
                    {step}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </Page>
      </Document>
    );

    const blob = await pdf(<MyDocument />).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url);
  };

  return (
    <>
      <button className="mx-1" onClick={generatePDF}>
        <span
          className="inline-flex items-center rounded-full p-2 bg-black text-white group transition-all duration-500 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none"
          role="alert"
          tabIndex="0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>

          <span className="whitespace-nowrap inline-block group-hover:max-w-screen-2xl group-focus:max-w-screen-2xl max-w-0 scale-80 group-hover:scale-100 overflow-hidden transition-all duration-500 group-hover:px-2 group-focus:px-2">
            ¡Descargar!
          </span>
        </span>
      </button>
    </>
  );
}

export default PDFButton;
