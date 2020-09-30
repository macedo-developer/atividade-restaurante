import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Button, Card, TextInput } from "react-native-paper";

export default class App extends React.Component {
  state = {
    consumoTotal: null,
    couvert: null,
    divisao: 1,
    taxaServico: 0,
    contaTotal: 0,
    valorDivisao: 0,
  };

  handleCalc = () => {
    if (
      this.state.consumoTotal === null ||
      this.state.consumoTotal === "" ||
      this.state.couvert === null ||
      this.state.couvert === "" ||
      this.state.divisao < 1 ||
      this.state.divisao === "" ||
      isNaN(this.state.divisao)
    ) {
      return alert("Insira os valores corretamente!");
    }

    console.log(this.state.consumoTotal);

    const taxa = (this.state.consumoTotal * 10) / 100;

    const total = this.state.consumoTotal + this.state.couvert + taxa;

    const porPessoa = total / this.state.divisao;

    this.setState({
      taxaServico: taxa.toFixed(2),
      contaTotal: total.toFixed(2),
      valorDivisao: porPessoa.toFixed(2),
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Restaurante Balaio de Lenha</Text>
        <View style={styles.form}>
          <TextInput
            keyboardType="numeric"
            label="Consumo Total"
            style={styles.input}
            onChangeText={(valor) =>
              this.setState({
                consumoTotal: parseFloat(valor),
              })
            }
          />
          <TextInput
            keyboardType="numeric"
            label="Couvert Artístico"
            style={styles.input}
            onChangeText={(valor) =>
              this.setState({
                couvert: parseFloat(valor),
              })
            }
          />
          <TextInput
            mode="flat"
            keyboardType="numeric"
            label="Dividir por Pessoa"
            style={styles.input}
            onChangeText={(valor) =>
              this.setState({
                divisao: parseInt(valor.replace(/[^0-9]/g, "")),
              })
            }
          />
          <Button
            style={styles.buttonResult}
            mode="contained"
            color="#7b0000"
            onPress={this.handleCalc}
          >
            <Text>Calcular conta final</Text>
          </Button>
        </View>
        <View style={styles.viewResult}>
          <Text style={styles.results}>
            Taxa de Serviço ..................... R$ {this.state.taxaServico}
          </Text>
          <Text style={styles.results}>
            Conta Total ............................ R$ {this.state.contaTotal}
          </Text>
          <Text style={styles.results}>
            Valor por Pessoa .................. R$ {this.state.valorDivisao}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f76300",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#f7f7f7",
    marginBottom: 30,
  },
  form: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    padding: 8,
  },
  input: {
    width: 280,
    marginVertical: 8,
    color: "#7b0000",
  },
  buttonResult: {
    height: 50,
    display: "flex",
    justifyContent: "center",
  },
  viewResult: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  results: {
    fontSize: 18,
    lineHeight: 28,
    color: "#f7f7f7",
  },
});
