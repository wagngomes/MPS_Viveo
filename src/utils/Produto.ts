export class Produto {

    codigo: string
    forecastMZero: number
    vendidoMZero: number
    estoqueTotal: number
    politica: number
    coeficienteForecast: number
    deltaForecast: number
    diasEstoqueTotal: number
    estoqueFinalSemCompra: number
    diasEstoqueFinalSemCompra: number
    qtdCompra: number

    constructor(codigo: string, forecastMZero: number, vendidoMZero: number, estoqueTotal: number, politica: number, coeficienteForecast: number){
        this.codigo = codigo
        this.forecastMZero = forecastMZero
        this.vendidoMZero = vendidoMZero
        this.estoqueTotal = estoqueTotal
        this.politica = politica
        this.coeficienteForecast = coeficienteForecast
        this.deltaForecast = 0
        this.diasEstoqueTotal = 0
        this.estoqueFinalSemCompra = 0
        this.qtdCompra = 0
        this.diasEstoqueFinalSemCompra = 0

        this.calculaDeltaForecast();
        this.calculaDiasEstoqueTotal();
        this.calculaEstoqueFinalSemCompra();
        this.calculaDiasEstoqueFinalSemCompra();
        this.calculaQtdCompra();
    }
    calculaDeltaForecast(){

        this.deltaForecast = this.forecastMZero - this.vendidoMZero

        if (this.deltaForecast < 0) {

           const deltaForecast = this.forecastMZero * this.coeficienteForecast
        }
        return this.deltaForecast
    }
    calculaDiasEstoqueTotal(){

        this.diasEstoqueTotal = this.estoqueTotal / (this.forecastMZero / 30)

        return this.diasEstoqueTotal
    }
    calculaEstoqueFinalSemCompra(){

        this.estoqueFinalSemCompra = this.estoqueTotal - this.deltaForecast 
    }
    calculaDiasEstoqueFinalSemCompra(){

        this.diasEstoqueFinalSemCompra = this.estoqueFinalSemCompra / (this.forecastMZero / 30)
    }
    calculaQtdCompra(){

        this.qtdCompra = (this.politica - this.diasEstoqueFinalSemCompra) * (this.forecastMZero / 30)

        if (this.qtdCompra > 0) {

            return this.qtdCompra
        }
        
        return 0
    }
  

}
