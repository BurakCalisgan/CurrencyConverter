import React, {Component} from 'react';
import 
{
    StyleSheet, 
    Text, 
    View,
    TextInput
} from 'react-native';

import axios from 'axios';

class Converter extends Component {

    getRates(){
        axios.get('http://data.fixer.io/api/latest?access_key=2346bb79ddfe535dd76feb7cf5a1e607&symbols=EUR,TRY,USD,CAD,JPY')
        .then(response => {
            const rates = response.data.rates;
            this.setState({
                rates
            })
        })
    }


    constructor(props){
        super(props);
        this.state = {
            tl: '',
            usd: '',
            cad: '',
            jpy: '',
            eur: '',
            input: ''
        }

        this.getRates = this.getRates.bind(this);
    }
    
    componentDidMount(){
        this.getRates();
    }


    render(){

        const {converterWrapper, inputStyle, textStyle} = styles;
        const {input, tl, usd, cad, jpy, eur, rates } = this.state;

        return (
            <View style={converterWrapper}>
                <TextInput placeholder='Enter EUR Value'
                style={inputStyle}
                keyboardType='numeric'
                onChangeText={(text)=> {
                    const i = parseFloat(text) || 0;

                    this.setState({
                        input: text,
                        tl: (i * rates['TRY']).toFixed(3),
                        usd: (i * rates['USD']).toFixed(3),
                        cad: (i * rates['CAD']).toFixed(3),
                        jpy: (i * rates['JPY']).toFixed(3),
                        eur: (i * rates['EUR']).toFixed(3)
                    })

                }}
                value={input}></TextInput>

                <Text style={textStyle}>TRY : {tl}</Text>
                <Text style={textStyle}>USD : {usd}</Text>
                <Text style={textStyle}>CAD : {cad}</Text>
                <Text style={textStyle}>JPY : {jpy}</Text>
                <Text style={textStyle}>EUR : {eur}</Text>

            </View>
            
        )
    }
}

const styles = StyleSheet.create( {
    converterWrapper: {
        paddingTop: 30,
        justifyContent: 'center',
        alignItems: 'center',

    },
    inputStyle: {
        width: 200,
        height: 40,
        paddingBottom: 10

    },
    textStyle: {
        width: 170,
        height: 50,
        fontWeight: 'bold'

    }

});
export default Converter;