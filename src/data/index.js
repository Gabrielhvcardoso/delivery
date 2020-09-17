export default {
  identifier: 'AAA',
  name: 'Feel Good Foods',
  logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTehjJMQl2rfjTix8fT1_J954eMNbTCyQTnZA&usqp=CAU',
  horizontalLogo: 'https://feel-good-foods.com/wp-content/uploads/2019/10/WebsiteLogo-1024x341.jpg',

  categories: [
    {
      name: 'Lanches',
      image: 'https://images.unsplash.com/photo-1568729527263-068c848425eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
      products: [
        {
          productId: 'sdhsdsdsd',
          name: 'Big Pig',
          favorite: true,
          image: 'https://images.unsplash.com/photo-1565060299509-453c4f3bc905?ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80',
          details: 'Duplo burguer com queijo, muuito bacon, calabresa e salada.',
          price: 42.89
        },
        {
          productId: 'sdhsdsdsd',
          name: 'Big Monster',
          favorite: true,
          image: 'https://images.unsplash.com/photo-1565060299583-08dd3af8e3cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80',
          details: 'Burguer tradicional com carne bovina e frango desfiado com anéis de cebola roxa e tomate.',
          price: 38.30
        },
        {
          productId: 'sdhsdsdsd',
          name: 'Double Hot',
          favorite: false,
          image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1303&q=80',
          details: 'Duplo burguer de costela com queijo, bacon, picles e molho especial.',
          price: 38.50
        },
        {
          productId: 'sdhsdsdsd',
          name: 'Old School',
          favorite: false,
          image: 'https://images.unsplash.com/photo-1568729527263-068c848425eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
          details: 'Burguer tradicional com queijo e carne desfiada',
          price: 18.90
        },
        {
          productId: 'sdhsdsdsd',
          name: 'Big Lucy',
          favorite: false,
          image: 'https://images.unsplash.com/photo-1551615593-ef5fe247e8f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=1380&q=80',
          details: 'Burguer tradicional com queijo prato e salada.',
          price: 25.90
        },
      ]
    },
    {
      name: 'Salada e acompanhamentos',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      products: [
        {
          productId: 'sdhsdsdsd',
          name: 'Salada completa',
          favorite: false,
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          details: 'Alface, tomate cereja, repolho, cenoura, melão, grão de bico, agrião, pepino, rabanete.',
          price: 28.30
        },
        {
          productId: 'sdhsdsdsd',
          name: 'Abacate recheado',
          favorite: false,
          image: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
          details: 'Abacate recheado com tomate, pepino, ricota e ervas.',
          price: 16.80
        },
        {
          productId: 'sdhsdsdsd',
          name: 'Baccalà mantecato e camarão frito',
          favorite: true,
          image: 'https://images.unsplash.com/photo-1581073750855-bac45fde1568?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80',
          details: '200g de camarão frito, torradas e queijo brie.',
          price: 32.90,
          options: [
            {
              title: 'Molhos',
              detail: "Você pode adicionar mais molhos",
              required: false,
              options: [
                {
                  name: "Ketchup",
                  addValue: null
                },
                {
                  name: "Gorgonzola",
                  addValue: 4.50
                },
                {
                  name: "Queijo pomerode",
                  addValue: 10.50
                },
              ]
            },
            {
              title: 'Acompanhamento',
              detail: "",
              required: false,
              options: [
                {
                  name: "Batata frita",
                  addValue: 9.90
                },
                {
                  name: "Batata rústica",
                  addValue: 9.90
                },
                {
                  name: "Onions",
                  addValue: 9.90
                },
              ]
            },
            {
              title: 'Talheres',
              detail: "",
              required: true,
              options: [
                {
                  name: "Preciso de talheres",
                  addValue: 0.10
                },
                {
                  name: "Não preciso de talheres",
                  addValue: null
                }
              ]
            }
          ]
        },
        {
          productId: 'sdhsdsdsd',
          name: 'Azeitonas Temperadas',
          favorite: false,
          image: 'https://images.unsplash.com/photo-1525845250100-0ff4997d4a44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1834&q=80',
          details: '150g de azeitonas temperadas',
          price: 5.90
        },
      ]
    },
    {
      name: 'Drinks',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
      products: [
        {
          productId: 'sdhsdsdsd',
          name: 'Caipirinha de limão',
          favorite: false,
          image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
          details: 'Proibido para menores de 18 anos',
          price: 15.90
        },
        {
          productId: 'sdhsdsdsd',
          name: 'Cocktail de Morango',
          favorite: false,
          image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=707&q=80',
          details: 'Proibido para menores de 18 anos',
          price: 20.50
        },
        {
          productId: 'sdhsdsdsd',
          name: 'Cocktail de figo',
          favorite: false,
          image: 'https://images.unsplash.com/photo-1566733971017-f6a46e832e95?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
          details: 'Proibido para menores de 18 anos',
          price: 20.50
        },
        {
          productId: 'sdhsdsdsd',
          name: 'Whiskey sour',
          favorite: false,
          image: 'https://images.unsplash.com/photo-1500217052183-bc01eee1a74e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
          details: 'Proibido para menores de 18 anos',
          price: 16.80
        },
        {
          productId: 'sdhsdsdsd',
          name: 'Blue ice',
          favorite: false,
          image: 'https://images.unsplash.com/photo-1541745038731-f1c2b5a1a49e?ixlib=rb-1.2.1&auto=format&fit=crop&w=699&q=80',
          details: 'Proibido para menores de 18 anos',
          price: 18.80
        },
        {
          productId: 'sdhsdsdsd',
          name: 'Drink com sorvete',
          favorite: false,
          image: 'https://images.unsplash.com/photo-1568901839119-631418a3910d?ixlib=rb-1.2.1&auto=format&fit=crop&w=601&q=80',
          details: 'Proibido para menores de 18 anos',
          price: 14.60
        },
        {
          productId: 'sdhsdsdsd',
          name: 'Caipirinha limão e morango',
          favorite: false,
          image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=707&q=80',
          details: 'Proibido para menores de 18 anos',
          price: 16.70
        },
        {
          productId: 'sdhsdsdsd',
          name: 'Drink de limão siciliano',
          favorite: false,
          image: 'https://images.unsplash.com/photo-1589132971214-ed8169976abd?ixlib=rb-1.2.1&auto=format&fit=crop&w=898&q=80',
          details: 'Proibido para menores de 18 anos',
          price: 12.20
        },
        {
          productId: 'sdhsdsdsd',
          name: 'Drink de Kiwi',
          favorite: false,
          image: 'https://images.unsplash.com/photo-1588673523898-687eaf18c036?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=723&q=80',
          details: 'Proibido para menores de 18 anos',
          price: 17.60
        },
        {
          productId: 'sdhsdsdsd',
          name: 'Drink de café e sorvete',
          favorite: false,
          image: 'https://images.unsplash.com/photo-1589638895165-e80df3583854?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
          details: 'Proibido para menores de 18 anos',
          price: 19.80
        },
        
      ]
    },
    {
      name: 'Cerveja',
      image: 'https://images.unsplash.com/photo-1575367439058-6096bb9cf5e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80',
      products: [
        {
          productId: 'sdhsdsdsd',
          name: 'Wiltshire Gold 500ml',
          favorite: false,
          image: 'https://images.unsplash.com/photo-1552831125-32128105ea04?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1700&q=80',
          details: 'Proibido para menores de 18 anos',
          price: 13.20
        },
        {
          productId: 'sdhsdsdsd',
          name: 'Ramsbury Gold 375ml',
          favorite: false,
          image: 'https://images.unsplash.com/photo-1549273418-aed16f85d3b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
          details: 'Proibido para menores de 18 anos',
          price: 8.90
        },
        {
          productId: 'sdhsdsdsd',
          name: 'York Brewery Blonde 375ml',
          favorite: false,
          image: 'https://images.unsplash.com/photo-1558803037-d7c30788c105?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80',
          details: 'Proibido para menores de 18 anos',
          price: 8.30
        },
        {
          productId: 'sdhsdsdsd',
          name: 'Five Summer American Pale 375ml',
          favorite: false,
          image: 'https://images.unsplash.com/photo-1596442149814-584dc6e92d01?ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80',
          details: 'Proibido para menores de 18 anos',
          price: 6.20
        },
        {
          productId: 'sdhsdsdsd',
          name: 'Vercamont Vacation New England Indian Pale Ale 330ml',
          favorite: false,
          image: 'https://images.unsplash.com/photo-1595318644790-dc51bdc72248?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          details: 'Proibido para menores de 18 anos',
          price: 7.20
        },
        {
          productId: 'sdhsdsdsd',
          name: 'Big Wednesday Indian Pale Ale 330ml',
          favorite: false,
          image: 'https://images.unsplash.com/photo-1597169219919-db4759c36803?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          details: 'Proibido para menores de 18 anos',
          price: 6.90
        },
      ]
    }
  ]
}
