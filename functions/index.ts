import { https } from 'firebase-functions';
import { WebhookClient } from 'dialogflow-fulfillment';
import { Suggestions, BasicCard, Button, Image, LinkOutSuggestion, BrowseCarouselItem, BrowseCarousel } from 'actions-on-google'
//import { BasicCard, Button, Image, LinkOutSuggestion } from 'actions-on-google'
import { ServerClient } from "postmark";
import axios from 'axios';
import { init, agent as agentHelper, entityEntryInterface } from 'dialogflow-helper';
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
//import { WooCommerceRestApi } from '@woocommerce/woocommerce-rest-api';

const WooCommerce = new WooCommerceRestApi({
    url: 'https://salescoach.bot', // Your store URL
    consumerKey: 'ck_3b094a4d4c876cea0736262b795bdbbb010e2065', // Your consumer key
    consumerSecret: 'cs_772d7c6a9a7976b793b3549e6e63b6a684bb1273', // Your consumer secret
    version: 'wc/v3' // WooCommerce WP REST API version
});
//let urlContext1;
const searchProducts: string = '';
let HealthProblem: string;



init({
    "client_email": "dialogflow-othdri@salesmentor-nz.iam.gserviceaccount.com",
    "project_id": "salesmentor-nz",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDOil/How0nZZbk\nkshdvCiU0bPrntNbp4PeUaQtvxdPDpc0/7kCuTUtYfKn7HssfFSRtT8G3OFXVs2B\nVUvhgPWYOM2+O4H9D43/J1uR7CdUZTk1D0m41X3QSpQa5+eQOGbqzeZI99OJwavc\nYqTF4o189wq1l2WJD0gdOly/vf7kcsbKI5Yh7g/eLl/+WmVefrBQnPDwSi9R96gP\nMADp3tdxNOHbvZTyFSmJr+GZdJ14sIiq1bns2DHAPawx4ohi9kz2oRbiYm7IqfOk\nzC/uBweEHoCIe9d5c3RA7vuxqxiWuJ7Q72VY0j51Gfrwb48quj/eP77XKlhrVAV7\nBEpe3YW9AgMBAAECggEADkMc4Q6/0kggFtGR93MORFSEvZD+nFYhc4Ekuqn25JUn\n2NeNwYPjiao5VOIuEUDWoCcpXoJzJxJN54/pyP0cOHI3ttqqG7zuu79OgfGSN7Az\ntpfDKfnIEdGMj50S7vEOHkmwjLpcR6dxhCrloOqHhakTer2lG8VL4ATPMchfaQvq\nLxCwiTBGa8j/LvvV4EhT64TIyfOfjAaE7185pD8A8IAIMLUwrrZyNtvAkiDui0ao\nRv/POzvghTUKVTV51ZoRKPpJH8Rt6ghgDsMmHAafLMW9U9bFMlS00UQaKEL/xlzF\nLxuC2pfAeKWAqtIzpgSfA2GFGBbz82ib3Bc0pDlIKwKBgQDoLxOvQfrwVWgtyx3S\nqv6EMtdgHqklVSTlPQxYHnC9u+GDSHlldplxp/roNxtxDuoMOLRTWf4kj+qMkkTx\n41yURHhz/u5j++xGcdIJOOC9Q/UZM30QjQp2Df1GHiNIl3p80OSVoHF+gEtCc8AU\nMstGnQRWbnuT4KQBP7qzMl+GswKBgQDjue1jsyFG2IpKwHyWioieKq+gyTvPX9eo\nCroS4+M+MdWM+dwbH41tpZOhkY3xJWavQ3wmylbTrqqpJ8ISb21xImvyZG0S8qAW\nEazNHyyATsLeLXoJlWKe4gcYsRQg0A/p8qccpbRTb4izGEF8JNydjrNViYSYAIQa\ntMrkgbd5zwKBgEeM2mAT0STm7OfPxCz7jNtoX367dByRFIGgQoGVP+D4WRJ/7wkZ\nd0fTIDsXYFmC4xVJFCjrfqn9v6X6HUz9Z7Y5M3VrhkNBixpaUQOOh5NLsehGObA0\nBplCzl4hQ3ZHV/PG2+pQOylkl8yupu6SiJoGISQRf/ueKmxIG1zFlTKJAoGBAOLu\nON4Nd6+9wbHUN1NdId9b8kBryCpS+/j9F4gTiDRGPOSLaQeuXaVSRtfO0H/qIXWt\n7l5JbFTtzita706ns4v2HVQjN36WQWk8m9KcqiACXLZC40YBk5F49FFqxQAd1n3v\nzRADILu0fajbFwa7RQ3NUnB+5Z8DhKGIYFdt3ISJAoGAJgKrw5H7Q6a1ceKQFUkO\n185QDxZs3g1ubTtm+bQV+FVLogxaMglU3cf5l382h7MlX1jBUa7gTPlhyYG5dwrI\ntTQqoilRwAdHTz5acDLjhVQbIbMqDUi+PFoC76PGUs1ZDW2xK0JTaYf666ciqmr7\nWeCkleYfKgtDTWkCcUPovAs=\n-----END PRIVATE KEY-----\n"
});

export const webhook = https.onRequest(async (request, response) => {
    try {

        const _agent = new WebhookClient({ request, response });
        console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
        console.log('Dialogflow Request body: ' + JSON.stringify(request.body));


        // function getProductInfo(agent) {
        //     const name = agent.parameters.name;
        //     return getSpreadsheetData().then(res => {
        //         res.data.map(person => {
        //             if (person.Name === name)
        //                 agent.add(`Here are the details for ${name}. Age: ${person.Age}, Email: ${person.Email}, Phone: ${person.Phone}`);

        //         });
        //     });
        // }


        async function wooTest(agent: WebhookClient) {
            

            await WooCommerce.get("products", {
                per_page: 100
            }).then((response1: { data: []; })=>{
                let products = [].concat(response1.data);
                console.log(products.length);
                console.log(response1.data)
            })
        }

        
        async function productForHealthProblem(agent: WebhookClient) {

            console.log("this is get productForHealthProblem intent");
            (agent.requestSource as any) = "ACTIONS_ON_GOOGLE";
            const conv = agent.conv();
            

            HealthProblem = agent.parameters.HealthProblem;
            let products: any[];
            const items: BrowseCarouselItem[] = [];
            //let urlContext1: any[];
            

            if (!HealthProblem) {
                conv.ask("What is your health problem");

                await agentHelper.getEntity("fc689e87-a9fc-4749-8d81-ee1dff6583c8").then((entity: any) => {
                    console.log("received entity: ", entity.name);
                    const entities: entityEntryInterface[] = entity.entities;

                    conv.ask(new Suggestions(
                        pluck(entities).synonyms[0],
                        pluck(entities).synonyms[0],
                        pluck(entities).synonyms[0],
                    ))
                    agent.add(conv);
                    return;
                }).catch(e => {
                    console.log("error in getting entity: ", e);
                    agent.add(conv);
                })
            } else {

                await WooCommerce.get("products", {
                    per_page: 100, // 100 products per page
                }).then(function (response2: any) {
                        products = [].concat(response2[0].data);

                        console.log("received product count: ", products.length);
                        console.log("first product name: ", products[0].name);


                        console.log("user said Health problem: ", HealthProblem);
                        

                        // short listing products
                        products.map((eachProduct: any) => {
                            console.log("eachProduct: ", eachProduct);
                            
                            
                            eachProduct.attributes.map((eachAttribute: { name: string, options: string[] }) => {
                                if (eachAttribute.name === "usedfor" && eachAttribute.options.some(x => x.toLowerCase() === HealthProblem.toLowerCase())) {
                                
                                    items.push(new BrowseCarouselItem({
                                        title: eachProduct.name,
                                        url: eachProduct.permalink + '?nt=f',
                
                                        // subtitle: 'This is a subtitle',
                                        description: eachProduct.short_description.replace(/<(?:.|\n)*?>/gm, '').replace(/&[^\s]*/, ''),
                                        image: new Image({
                                            url: eachProduct.images[0].src,
                                            alt: "Image of " + eachProduct.name
                                        }),
                                        // footer: "This is footer"
                                    }));/*
                                    urlContext1.push({
                                        name: 'openWebview',
                                        lifespan: 1,
                                        parameters: {
                                            hideBrowserTab: false,
                                            webViewTarget: 'self',
                                            webViewUrl: eachProduct.permalink,
                                        
                                        }
                                    });
                                    */
                                    
                                }
                                
                            })
                            
                        });

                        if (items.length) {
                            
                            
                            //agent.setContext(urlContext1);
                            conv.ask(`You might be looking for these products: `);

                            conv.ask(new BrowseCarousel({ items: items }));
                            // conv.ask(new Suggestions(`I have got a different health problem`))
                            conv.ask("Learn What Wallach Says about " + HealthProblem + " (3rd Party Site)");
                            conv.ask(
                                new BasicCard({
                                    buttons: [
                                        new Button({ title: `Wallach on ${HealthProblem} (3rd Party Site)`, url: 'https://app.searchie.io/widget/yJe1BjV1ak#/search/' + HealthProblem })
                                    ],
                                    title: 'Search Wallach Database',
                                    image: new Image({
                                        url:
                                            'https://youngofficial.com/wp-content/uploads/2019/06/DrWallach-circle.png',
                                        alt: 'photo of doctor wallach'
                                    }),
                                    // subtitle: 'Test subtitle',
                                    // text: 'Test text'
                                })
                            );
                            agent.add(conv)
                            return;

                        } else {
                            conv.ask("Learn What Wallach Says about " + HealthProblem + " (3rd Party Site)");
                            conv.ask(
                                new BasicCard({
                                    buttons: [
                                        new Button({ title: `Wallach on ${HealthProblem} (3rd Party Site)`, url: 'https://app.searchie.io/widget/yJe1BjV1ak#/search/' + HealthProblem })
                                    ],
                                    title: 'Search Wallach Database',
                                    image: new Image({
                                        url:
                                            'https://youngofficial.com/wp-content/uploads/2019/06/DrWallach-circle.png',
                                        alt: 'photo of doctor wallach'
                                    }),
                                    // subtitle: 'Test subtitle',
                                    // text: 'Test text'
                                })
                            );
                            agent.add(conv);
                            return;
                        }

                    }).catch((error: any)  => {
                        console.log("error in getting data from woocommerece api: ", Error);
                        agent.add("sorry I am currently unavailable, please try again later");
                        return
                    }).finally(() => {
                        // Always executed.
                            });

            }

        }

        async function searchProduct(agent: WebhookClient){
            console.log('this is search product by name intent');
            (agent.requestSource as any) = "ACTIONS-ON-GOOGLE";
            const conv = agent.conv();
            //let response: any[];

            //get product search term from the sys.any entity
            //searchProducts = agent.parameters.any;
            let products: any[];
            const items: BrowseCarouselItem[] = [];

            //if search term is not provided, ask for it
            if(!searchProducts){
                conv.ask('What is the name or part of the name of the product you are looking for?');

            }else{
                await WooCommerce.get("products", {
                    per_page: 100, // 100 products per page
                }).then(function (response3: { data: []; }[]){
                    products = [].concat(response3[0].data);
                    //list returned products
                    console.log("received product count: ", products.length);
                    console.log("first product name: ", products[0].name);

                    //log the product search term sent
                    console.log("user said Health problem: ", searchProducts);

                    // short listing products
                    products.map((eachProduct: any)=>{
                        console.log("eachProduct: ", eachProduct);
                        //if we get more than one product, send response as carousel
                        
                        eachProduct.attributes.map((eachAttribute: { name: string, options: string[] }) => {
                            if (eachAttribute.name === "usedfor") {
                            
                                items.push(new BrowseCarouselItem({
                                    title: eachProduct.name,
                                    url: eachProduct.permalink + '?nt=f',
            
                                    // subtitle: 'This is a subtitle',
                                    description: eachProduct.short_description.replace(/<(?:.|\n)*?>/gm, '').replace(/&[^\s]*/, ''),
                                    image: new Image({
                                        url: eachProduct.images[0].src,
                                        alt: "Image of " + eachProduct.name
                                    }),
                                    // footer: "This is footer"
                                }));
                                
                            }
                            
                        })      
                        
                        
                    });
                    if (items.length) {
                            
                            
                        //agent.setContext(urlContext1);
                        conv.ask(`You might be looking for these products: `);

                        conv.ask(new BrowseCarousel({ items: items }));
                        // conv.ask(new Suggestions(`I have got a different health problem`))
                        conv.ask("Learn What Wallach Says about " + searchProducts + " (3rd Party Site)");
                        conv.ask(
                            new BasicCard({
                                buttons: [
                                    new Button({ title: `Wallach on ${searchProducts} (3rd Party Site)`, url: 'https://app.searchie.io/widget/yJe1BjV1ak#/search/' + searchProducts })
                                ],
                                title: 'Search Wallach Database',
                                image: new Image({
                                    url:
                                        'https://youngofficial.com/wp-content/uploads/2019/06/DrWallach-circle.png',
                                    alt: 'photo of doctor wallach'
                                }),
                                // subtitle: 'Test subtitle',
                                // text: 'Test text'
                            })
                        );
                        agent.add(conv)
                        return;

                    } else {
                        conv.ask("Learn What Wallach Says about " + searchProducts + " (3rd Party Site)");
                        conv.ask(
                            new BasicCard({
                                buttons: [
                                    new Button({ title: `Wallach on ${searchProducts} (3rd Party Site)`, url: 'https://app.searchie.io/widget/yJe1BjV1ak#/search/' + searchProducts })
                                ],
                                title: 'Search Wallach Database',
                                image: new Image({
                                    url:
                                        'https://youngofficial.com/wp-content/uploads/2019/06/DrWallach-circle.png',
                                    alt: 'photo of doctor wallach'
                                }),
                                // subtitle: 'Test subtitle',
                                // text: 'Test text'
                            })
                        );
                        agent.add(conv);
                        return;
                    }
                   
                }).catch((error: any)  => {
                    console.log("error in getting data from woocommerece api: ", Error);
                    agent.add("sorry I am currently unavailable, please try again later");
                    return
                }).finally(() => {
                    // Always executed.
                        });
            }


        }

        async function getProductInfo(agent: WebhookClient) {
            console.log("this is get product intent");
            (agent.requestSource as any) = "ACTIONS_ON_GOOGLE";
            const conv = agent.conv();


            const productName = parseInt(agent.parameters.productName);
            let products: any[];

            // // getting data from sheet
            // await axios.get('https://sheetdb.io/api/v1/jjabi12qzr5q4')
            //     .then((res) => {
            //         console.log("data: ", res);
            //         console.log("data: ", res.data);
            //         data = res.data
            //     })
            //     .catch(e => {
            //         console.log("error in getting sheet data: ", e);
            //         agent.add("sorry I am currently unavailable, please try again later");
            //         return
            //     })

            // getting data from woocommerece 
            await Promise.all([
                WooCommerce.get("products", {
                    per_page: 100,
                    page: 1
                }),
                WooCommerce.get("products", {
                    per_page: 100,
                    page: 2
                })
            ])
                .then(function (res) {
                    products = [].concat(res[0].data, res[1].data);

                    console.log("received product count: ", products.length);
                    console.log("first product name: ", products[0].name);

                    if (!productName) {

                        conv.ask("which products would you like to know about");
                        conv.ask(new Suggestions(pluck(products).name))
                        conv.ask(new Suggestions(pluck(products).name))
                        conv.ask(new Suggestions(pluck(products).name))
                        agent.add(conv);

                        return;

                    } else {

                        console.log("user said product number: ", productName);

                        products.map((eachProduct: any) => {
                            // console.log("eachProduct: ", eachProduct);

                            if (parseInt(eachProduct.id) === productName) {
                                conv.ask(`This might be what you are looking for. Here are the details for ${eachProduct.name}.`);

                                conv.ask(
                                    new BasicCard({
                                        title: eachProduct.name,
                                        // subtitle: 'This is a subtitle',
                                        text: eachProduct.short_description,
                                        image: new Image({
                                            url: eachProduct.images[0].src,
                                            alt: "Image of " + eachProduct.name
                                        }),
                                        buttons: [
                                            new Button({ title: "Learn More", url: eachProduct.permalink }),
                                            //new Button({ title: 'Test Button 2', url: 'https://botcopy.com' })
                                        ],
                                    })
                                );
                                conv.ask(
                                    new LinkOutSuggestion({
                                        name: eachProduct.ButtonText || "Learn More (new tab)",
                                        url: eachProduct.permalink
                                    })
                                );
                                // conv.ask(new Suggestions("Get other product info"));
                                // conv.ask(new Suggestions("Show details of " + pluck(products).name))
                                // agent.add(conv);

                                return;
                            }
                        });

                    }

                }).catch(e => {
                    console.log("error in getting data from woocommerece api: ", e);
                    agent.add("sorry I am currently unavailable, please try again later");
                    return
                })
        }



        

        async function getProdInfo(agent: WebhookClient){
            console.log("this is get product intent");
            (agent.requestSource as any) = "ACTIONS-ON-GOOGLE";
            const conv = agent.conv();
            let products5: any;
            let products6: any[];
            const productName = parseInt(agent.parameters.productName);
            if(!productName){
                await WooCommerce.get('products',{
                    per_page: 20,
                }).then((res:any) =>{
                    products6 = [].concat(res.data);
                    conv.ask("which products would you like to know about");
                    conv.ask(new Suggestions(pluck(products6).name));
                    conv.ask(new Suggestions(pluck(products6).name));
                    conv.ask(new Suggestions(pluck(products6).name));
                        //conv.ask('which product would you like to know about');
                    agent.add(conv);

                    return;
                }).catch((error: any) => {
                    console.log("error in getting data from woocommerece api: ", error);
                    console.log("Response Status:", error.response.status);
                    console.log("Response Headers:", error.response.headers);
                    console.log("Response Data:", error.response.data);
                    agent.add("sorry I am currently unavailable, please try again later");
                    return
                })
            }
            else{
                await WooCommerce.get(`products/${productName}`
            ).then((response5: any) => {
                products5 = response5.data;
                console.log(products5);
                const {name, short_description, permalink,images} = products5;
                console.log(name);
                console.log(short_description.replace(/<(?:.|\n)*?>/gm, '').replace(/&[^\s]*/, ''));
                console.log(permalink);
                console.log(images[0].src);
                conv.ask(`This might be what you are looking for. Here are the details for ${name}.`);
                
                conv.ask(
                    new BasicCard({
                        title: name,
                        text: short_description,
                        image: new Image({
                            url: images[0].src,
                            alt: "Image of " + name
                        }),
                        buttons: [
                            new Button({ title: "Learn More", url: permalink }),
                                ],
                        })
                );
                conv.ask(
                    new LinkOutSuggestion({
                        name:  "Learn More (new tab)",
                        url: permalink
                    })
                );
                //conv.ask(new Suggestions("Get other product info"));
                //conv.ask(new Suggestions("Show details of " + pluck(products).name))
                
                agent.add(conv);

            


            }).catch((error: any) => {
                console.log("error in getting data from woocommerece api: ", error);
                console.log("Response Status:", error.response.status);
                console.log("Response Headers:", error.response.headers);
                console.log("Response Data:", error.response.data);
                agent.add("sorry I am currently unavailable, please try again later");
                return
            })
            }
            

        }

        function CaptureUserInfo(agent: WebhookClient) {
            console.log("agent.parameters: ", agent.parameters);
            const {
                firstname, lastname, email, mobilephone
            } = agent.parameters;

            const data = [{
                firstname: firstname,
                lastname: lastname,
                Email: email,
                mobilephone: mobilephone
            }];
            axios.post('https://sheet.best/api/sheets/36020baa-fccb-4667-af52-90759d44e976', data).catch(e => {
                console.log("error in saving data: ", e)
            })
        }

        async function getEmail(agent: WebhookClient) {

            console.log("GetEmail agent.parameters: ", agent.parameters);
            console.log("user said: ", agent.query);


            if (!agent.parameters.email) {
                agent.add("please tell me your email, I will forward it to human support agent and he will get in touch with you as soon as possible");
            } else if (!agent.parameters.question) { // slot filling for every parameter is not in use
                agent.add(`please re-phrase your question so I will forward your question along with your email too`);
            } else {

                // const serverTokenDev = "0cb9fc14-bdcb-4616-9be7-fa501b6c39a9";
                const serverToken = "28733ad7-6334-445d-a62d-2fe47612608b";
                const client = new ServerClient(serverToken);

                await client.sendEmail({
                    "ReplyTo": agent.parameters.email,
                    "From": "info@sysborg.com",
                    "To": "gist-edcclxgk@inbound.gistmail1.com",
                    "Subject": "email Support request",
                    "TextBody": `Hey,
            I was trying to talk with chatbot on https://youngofficial.com/test-bot/ but I didn't get my problem solved
            My Email: ${agent.parameters.email}
            My Question: "${agent.query}"
            
            thanks`

                })
                    .then((sendingResponse) => {
                        console.log("sending response: ", sendingResponse);
                        agent.add(`Awesome. your email noted as ${agent.parameters.email} We will be in touch soon regarding your question: "${agent.query}".`);
                        return;
                    })
                    .catch(e => {
                        console.log("unable to send email.error: ", e);
                        agent.add("unable to send email postmark is under review");
                        return;
                    });
            }
        }

        function welcome(agent: any) {

            // console.log("agent.contexts: ", agent.contexts);
            // console.log("agent.requestSource: ", agent.requestSource);
            // console.log("request.body: ", request.body);
            // console.log("request.body: ", JSON.stringify(request.body));
            // console.log("agent.contexts.botcopy-ref-context: ", agent.contexts["botcopy-ref-context"]);

            // agent.add("I have received these in context: " + JSON.stringify(agent.contexts))
            // agent.add("everything I received in request is here: " + JSON.stringify(request.body))
            agent.requestSource = "ACTIONS_ON_GOOGLE";
            const conv = agent.conv();

            conv.ask("Hi! Can I help you? 😁")
            //conv.ask(new Suggestions("Show me products"))
            conv.ask(new Suggestions("Dr. Wallach Info"))
            conv.ask(new Suggestions("90 Essentials"));
            agent.add(conv)
            return;

        }

        function supportPage(agent: WebhookClient) {

            (agent.requestSource as any) = 'ACTIONS_ON_GOOGLE';
           
            const urlContext1 = {
                name: 'openWebview',
                lifespan: 1,
                parameters: {
                    hideBrowserTab: false,
                    webViewTarget: 'self',
                    webViewUrl: 'https://youngofficial.com/support'
                }
            };
            
            //agent.context.set(urlContext1);
            agent.setContext(urlContext1);
            
            
            const conv = agent.conv();
            conv.ask("Opening our Support Page!");
            conv.ask(new BasicCard({
                buttons: [new Button({
                    title: 'Leave Message for Live Agents Here',
                    url: 'https://youngofficial.com/support'
                })],
                title: 'Sorry I am still under training.  please click on this link to leave a message for one of our live agents.'
            }));
            conv.ask(
                new LinkOutSuggestion({
                    name: 'Youngevity Corporate Directly (Phone Ordering and Customer Service)',
                    url: 'https://shopdirect.youngevity.com/us_en/customer-care#contact-us/'
                })
            );
            agent.add(conv);
        }


        function fallback(agent: WebhookClient) {
            agent.add(`I didn't understand`);
            agent.add(`I'm sorry, can you try again?`);
        }

        const intentMap = new Map();
        intentMap.set('GetEmail', getEmail);
        intentMap.set('Default Welcome Intent', welcome);
        intentMap.set('Z product test - delete', getProductInfo);
        intentMap.set('test', wooTest);
        intentMap.set('productForHealthProblem', productForHealthProblem);
        intentMap.set('productSearch - yes', searchProduct);
        intentMap.set('Default Fallback Intent - fallback - yes',supportPage );
        intentMap.set('getProductInfo1234', getProdInfo);
        

        intentMap.set('wooTestDeleteThis', wooTest);

        // tslint:disable-next-line: no-floating-promises
        _agent.handleRequest(intentMap);
    } catch (e) {
        console.log("main error catch: ", e);
    }
});





export function pluck(arr: any) {
    const randIndex = Math.floor(Math.random() * arr.length);
    return arr[randIndex];
}