import { render } from '@testing-library/react';
import React, { Component } from 'react';
import response from 'react';
import './Button.css'


export class BasicLineChartButton extends Component {

    clickButtonToGetData = () => {
        Promise.all([
            fetch('http://172.26.129.195:5984/api/get_all_documents_view/sudo_income/'),
            fetch('http://172.26.129.195:5984/api/get_all_documents_view/sudo_income/'),
           
        ])
        .then(([response1, response2, response3]) => {
            if (!response1.ok  || !response2.ok || !response2.ok) {
                throw new Error('Network response was not ok');
            } 
            return Promise.all([response1.json(), response2.json(), response2.json()]);
            
        })
        .then(([data1, data2, data3]) => {
            // transform responses to strings.
            this.props.onDataFetched(data1, data2, data3);
        })
        .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    }   
    
    render() {
        const buttonNames = ["gsyd", "gmel", "gbri", "gper", "gabe", "acte", "ghob", "gdar", "oter"];

        return (
            <div > 
            {buttonNames.map((name, index) => (
                <button key={index} onClick={() => this.clickButtonToGetData(name)} className='button'>{name}</button>
            ))}
        </div>
        );
    }
}
