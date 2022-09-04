/// <reference types ="Cypress" />

describe('Deck Of Cards API Tests', ()=>{

    it('Create A Deck', ()=>{

        cy.request({
            method : 'GET',
            url : 'api/deck/new/'
        }).then((res)=>{
            window.res = res.body;
            expect(res.status).to.eq(200)
            expect(res.body.success).to.eq(true)
            expect(res.body.deck_id).to.eq(window.res.deck_id)
            expect(res.body.remaining).to.eq(52)
            expect(res.body.shuffled).to.eq(false)
        })
    })

    it('Shuffle The Deck', ()=>{
        let deck_id = window.res.deck_id;

        cy.request({
            method : 'GET',
            url : 'api/deck/' + deck_id + '/shuffle/'
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.success).to.eq(true)
            expect(res.body.remaining).to.eq(52)
            expect(res.body.shuffled).to.eq(true)
        })
    })

    it('Draw a Card', ()=>{
        let deck_id = window.res.deck_id;
        let number_of_cards = 3;

        cy.request({
            method : 'GET',
            url : 'api/deck/' + deck_id + '/draw/?count=' + number_of_cards + ''
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.success).to.eq(true)
            expect(res.body.remaining).to.eq(52 - number_of_cards)
            // expect(res.body.shuffled).to.eq(true)
        })
    })


});