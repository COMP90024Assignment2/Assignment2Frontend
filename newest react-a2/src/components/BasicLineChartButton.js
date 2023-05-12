import { render } from '@testing-library/react';
import React, { Component } from 'react';
import response from 'react';

export class BasicLineChartButton extends Component {

    clickButtonToGetData = () => {
        Promise.all([
            fetch('http://172.26.129.195:5984/api/get_all_documents_view/sudo_income/'),
            fetch('http://172.26.129.195:5984/api/get_all_documents_view/sudo_income/'),
           
        ])
        .then(([response1, response2]) => {
            if (!response1.ok || !response2.ok) {
                throw new Error('Network response was not ok');
            } 
            return Promise.all([response1.json(), response2.json()]);
            
        })
        .then(([data1, data2]) => {
            // transform responses to strings.
            this.props.onDataFetched(data1, data2);
        })
        .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    }   
    
    render() {
        return (
            <div>
                <button onClick={this.clickButtonToGetData}>Button</button>
            </div>
        );
    }
}
