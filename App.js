import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Button, Card, TextInput } from "react-native-paper";

export default class App extends React.Component {
  state = {
    consumoTotal: "0",
    couvert: "0",
    divisao: 1,
    taxaServico: 0,
    contaTotal: 0,
    valorDivisao: 0,
  };

  handleCalc = () => {
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
            label="Consumo Total"
            style={styles.input}
            value={this.state.consumoTotal}
            onChangeText={(valor) =>
              this.setState({
                consumoTotal: parseFloat(
                  valor.replace(",", ".").replace(/[^0-9]/g, "")
                ),
              })
            }
          />
          <TextInput
            label="Couvert Artístico"
            style={styles.input}
            value={this.state.couvert}
            onChangeText={(valor) =>
              this.setState({
                couvert: parseFloat(
                  valor.replace(",", ".").replace(/[^0-9]/g, "")
                ),
              })
            }
          />
          <TextInput
            label="Dividir por Pessoa"
            style={styles.input}
            value={this.state.divisao}
            onChangeText={(valor) =>
              this.setState({
                divisao: parseFloat(
                  valor.replace(",", ".").replace(/[^0-9]/g, "")
                ),
              })
            }
          />
          <Button
            style={styles.buttonResult}
            mode="contained"
            color="#7b0000"
            onPress={this.handleCalc}
          >
            Calcular conta final
          </Button>
        </View>
        <View style={styles.viewResult}>
          <Text style={styles.results}>
            Taxa de Serviço ..........{" "}
            {Intl.NumberFormat("pt-br", {
              style: "currency",
              currency: "BRL",
            }).format(this.state.taxaServico)}
          </Text>
          <Text style={styles.results}>
            Conta Total ..................{" "}
            {Intl.NumberFormat("pt-br", {
              style: "currency",
              currency: "BRL",
            }).format(this.state.contaTotal)}
          </Text>
          <Text style={styles.results}>
            Valor por Pessoa .......{" "}
            {Intl.NumberFormat("pt-br", {
              style: "currency",
              currency: "BRL",
            }).format(this.state.valorDivisao)}
          </Text>
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f76300",
    alignItems: "center",
    justifyContent: "center",
  },
});
