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
        let total_deck = window.res.remaining;
        let number_of_cards = 3;

        cy.request({
            method : 'GET',
            url : 'api/deck/' + deck_id + '/draw/?count=' + number_of_cards + ''
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.success).to.eq(true)
            expect(res.body.remaining).to.eq(total_deck - number_of_cards)
        })
    })

    it('Create Pile1', ()=>{
        let deck_id = window.res.deck_id;
        let total_deck = window.res.remaining;
        let pile_name = "pile1";
        let draw_pile1 = 5;
        const pile1_cards_list = ["AS","2S","KS","AD","2D"];

        cy.request({
            method : 'GET',
            url : 'api/deck/' + deck_id + '/draw/?count=' + draw_pile1 + ''
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.success).to.eq(true)
            // expect(res.body.remaining).to.eq(res.body.remaining - draw_pile1)
        }).then((pileone)=>{
            cy.request({
                method : 'GET',
                url : 'api/deck/' + deck_id + '/pile/' + pile_name + '/add/?cards=' + pile1_cards_list + ''
            }).then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body.success).to.eq(true)
                // expect(res.body.piles.pile1.remaining).to.eq(pile1_cards_list.length)
                cy.log(res.body.piles.pile1.remaining)
            }).then((pile_shuffle)=>{
                cy.log('Shuffle Pile 1')
                cy.request({
                    method : 'GET',
                    url : 'api/deck/' + deck_id + '/pile/' + pile_name + '/shuffle/'
                }).then((pile_shuffle_res)=>{
                    expect(pile_shuffle_res.status).to.eq(200)
                    expect(pile_shuffle_res.body.success).to.eq(true)
                    // expect(pile_shuffle_res.body.piles.pile1.remaining).to.eq(pile1_cards_list.length)
                    cy.log(pile_shuffle_res.body.piles.pile1.remaining)
                }).then((draw_from_pile1)=>{
                    cy.log('Draw 2 Cards from Pile 1')
                    let draw_count = 2
                    cy.request({
                        method : 'GET',
                        url : 'api/deck/' + deck_id + '/pile/' + pile_name + '/draw/?count=' + draw_count + ''
                    }).then((pile_draw_res)=>{
                        expect(pile_draw_res.status).to.eq(200)
                        expect(pile_draw_res.body.success).to.eq(true)
                        // expect(pile_shuffle_res.body.piles.pile1.remaining).to.eq(pile_shuffle_res.body.piles.pile1.remaining - draw_count)
                        cy.log(pile_draw_res.body.piles.pile1.remaining)
                    })
                })
            })
        })

    })

    it('Listing Cards in Pile1', ()=>{
        let deck_id = window.res.deck_id;
        let window_response = window.res;
        let pile_name = "pile1";
        const pile1_cards_list = ["AS","2S","KS","AD","2D"];

        cy.request({
            method : 'GET',
            url : 'api/deck/' + deck_id + '/pile/' + pile_name + '/list'
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.success).to.eq(true)
            expect(res.body.piles.pile1.cards.code).to.not.be.null
            // expect(res.body.piles.pile2.cards.code).to.include(pile1_cards_list)
        })
    })

    it('Create Pile2', ()=>{
        let deck_id = window.res.deck_id;
        let pile_name = "pile2";
        const pile2_cards_list = ["KD","AC","2C","KC","AH"];

        cy.request({
            method : 'GET',
            url : 'api/deck/' + deck_id + '/pile/' + pile_name + '/add/?cards=' + pile2_cards_list + ''
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.success).to.eq(true)
        }).then((draw_from_pile2)=>{
            cy.log('Draw 3 Cards from Pile 2')
            let draw_count = 3
            cy.request({
                method : 'GET',
                url : 'api/deck/' + deck_id + '/pile/' + pile_name + '/draw/?count=' + draw_count + ''
            }).then((pile_draw_res)=>{
                expect(pile_draw_res.status).to.eq(200)
                expect(pile_draw_res.body.success).to.eq(true)
                // expect(pile_shuffle_res.body.piles.pile1.remaining).to.eq(pile_shuffle_res.body.piles.pile2.remaining - draw_count)
                cy.log(pile_draw_res.body.piles.pile2.remaining)
            })
        })
    })

    it('Listing Cards in Pile2', ()=>{
        let deck_id = window.res.deck_id;
        let window_response = window.res;
        let pile_name = "pile2";
        const pile1_cards_list = ["KD","AC","2C","KC","AH"];

        cy.request({
            method : 'GET',
            url : 'api/deck/' + deck_id + '/pile/' + pile_name + '/list'
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.success).to.eq(true)
            expect(res.body.piles.pile2.cards.code).to.not.be.null
            // expect(res.body.piles.pile2.cards.code).to.include(pile1_cards_list)

        })
    })


});