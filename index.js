'use strict';

const request = require( 'request' );
var cheerio = require('cheerio');

const newsAddr = 'http://ria.ru/economy/';

request( newsAddr, ( error, response, body ) => {
    if( !error ) {
        if( response.statusCode == 200 ) {
            const $ = cheerio.load( body );
            $( '.list_item_text' ).each( function( i, elem ) {
                console.log( 'Новость от', $( this ).find( '.list_item_date' ).text() );
                console.log( '"' + $( this ).find( '.list_item_title' ).text() + '"' );
                console.log( $( this ).find( '.list_item_announce' ).text() );
                console.log( 'Адрес: ', 'http://ria.ru' + $( this ).find( '.list_item_title a' ).attr("href") );
                console.log( '\n' );
                return i<5;
            });
            
        } else console.log( 'Ошибка! Сервер вернул статус "' + response.statusCode + '"')
    } else console.log( error );
});