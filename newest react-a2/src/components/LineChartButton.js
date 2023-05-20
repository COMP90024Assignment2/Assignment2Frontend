import { render } from '@testing-library/react';
import React, { Component } from 'react';
import response from 'react';
import './Button.css'


export class BasicLineChartButton extends Component {

    clickButtonToGetData = () => {
        Promise.all([
            fetch('http://172.26.129.195:5984/api/get_all_documents_view/sudo_income/'),
           
        ])
        .then(([response]) => {
            if (!response) {
                throw new Error('Network response was not ok');
            } 
            return Promise.all([response.json()]);
            
        })
        .then(([data]) => {
            // transform responses to strings.
            this.props.onDataFetched(data);
        })
        .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    }   
     
    render() {
        return (
            <div > 
            {buttonNames.map((name, index) => (
                <button key={index} onClick={() => this.clickButtonToGetData(name)} className='button'>Mastodon</button>
            ))}
        </div>
        );
    }
}
