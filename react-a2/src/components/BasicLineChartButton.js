import { render } from '@testing-library/react';
import React, { Component } from 'react';
import response from 'react';

export class BasicLineChartButton extends Component {

    clickButtonToGetData = () => {
        fetch('http://172.26.129.195:5984/api/get_all_documents_view/sudo_income/')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } 
            return response.json();
            
        })
        .then((data) => {
            // transform response to string.
            this.props.onDataFetched(data);
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