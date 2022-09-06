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
            }).then((shuffle)=>{
                let deck_id = window.res.deck_id;

                cy.request({
                    method : 'GET',
                    url : 'api/deck/' + deck_id + '/shuffle/'
                }).then((res)=>{
                    expect(res.status).to.eq(200)
                    expect(res.body.success).to.eq(true)
                    expect(res.body.remaining).to.eq(52)
                    expect(res.body.shuffled).to.eq(true)
            }).then((draw)=>{

                let deck_id = window.res.deck_id;
                let number_of_cards = 10;
    
                cy.request({
                    method : 'GET',
                    url : 'api/deck/' + deck_id + '/draw/?count=' + number_of_cards + ''
                }).then((draw_res)=>{
                    expect(draw_res.status).to.eq(200)
                    expect(draw_res.body.success).to.eq(true)
                    expect(draw_res.body.remaining).to.eq(52 - number_of_cards)
                    expect(draw.body.shuffled).to.eq(true)
                }).then((pile1)=>{
                    let deck_id = window.res.deck_id;
                    let total_deck = window.res.remaining;
                    let pile_name = "pile1";
                    const pile1_cards_list = ['AS','2S','KS','AD','2D'];
                    
            
                    cy.request({
                        method : 'GET',
                        url : 'api/deck/' + deck_id + '/pile/' + pile_name + '/add/?cards=' + pile1_cards_list + '' 
                        
                    }).then((pile_res)=>{
            
                        expect(pile1.status).to.eq(200)
                        expect(pile1.body.success).to.eq(true)
                        // expect(pile_res.body.piles.pile1.remaining).to.eq(pile1_cards_list.length)
                        cy.log('Remaining Cards in Pile 1 is ' + pile_res.body.piles.pile1.remaining)
                        cy.log(total_deck)
                    }).then((pile2)=>{
                        let deck_id = window.res.deck_id;
                        let pile_name = "pile2";
                        const pile2_cards_list = ["KD","AC","2C","KC","AH"];
                
                        cy.request({
                            method : 'GET',
                            url : 'api/deck/' + deck_id + '/pile/' + pile_name + '/add/?cards=' + pile2_cards_list + ''
                        }).then((pile2_res)=>{
                           
                            expect(pile2_res.status).to.eq(200)
                            expect(pile2_res.body.success).to.eq(true)
                            // expect(pile2_res.body.piles.pile2.remaining).to.eq(pile2_cards_list.length)
                        }).then((list_pile1)=>{
                            let deck_id = window.res.deck_id;
                            let window_response = window.res;
                            let pile_name = "pile1";
                            const pile1_cards_list = ["AS","2S","KS","AD","2D"];
                    
                            cy.request({
                                method : 'GET',
                                url : 'api/deck/' + deck_id + '/pile/' + pile_name + '/list'
                            }).then((list_pile1_res)=>{
                                cy.log('List of Pile 1')
                                cy.log(list_pile1_res.body.remaining)
                                cy.log(list_pile1_res.body.piles.pile1.remaining)
                                expect(list_pile1_res.status).to.eq(200)
                                expect(list_pile1_res.body.success).to.eq(true)
                                // expect(list_pile1_res.body.piles.pile1.remaining).to.eq(pile1_cards_list.length)
                                expect(list_pile1_res.body.piles.pile1.cards.code).to.not.be.null
                                
                            })
                        })
                    })
                })

            })
        })


    })
});