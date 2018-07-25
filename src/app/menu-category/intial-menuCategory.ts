export class Init {
    load() {
      if (localStorage.getItem('menuCategories') === null || localStorage.getItem('menuCategories') == undefined) {
        console.log("Creating the initial set of menu category ...");
        var menuCategories = [
          {
            id: '1',
            menuCategoryName: "Starter",
            menuItems: [
              {
                itemId:'1',
                itemName:'Manchurian',
                quantity:'half',
                price: 120.00,
                makingTime:20,
                itemtype:'veg',
                description:'authentic spicy chinese manchurian with gravy.. ',
                cuisine: 'chinese'
              },
              {
                itemId:'2',
                itemName:'Chicken Chilly',
                quantity:'full',
                price: 230.00,
                makingTime:35,
                itemtype:'Non-Veg',
                description:'spicy chicken with capsicum... ',
                cuisine: 'North-Indian'
              }
            ]
          },
          {
            id: '2',
            menuCategoryName: "Main Course",
            menuItems: [
              {
                itemId:'1',
                itemName:'Dal Tadka',
                quantity:'full',
                price: 200.00,
                makingTime:25,
                itemtype:'Veg',
                description:'dal with ghee tadka.. ',
                cuisine: 'North-Indian'
              }
              
            ]
          },
          {
            id: '3',
            menuCategoryName: "Dessert",
            menuItems: [
              {
                itemId:'1',
                itemName:'Gulab Jamun',
                quantity:'full',
                price: 100.00,
                makingTime:5,
                itemtype:'Veg',
                description:'special hot gulab jamun,full-4 pcs.,half-2pcs..',
                cuisine: 'North-Indian'
              },
              {
                itemId:'2',
                itemName:'Rasmalai',
                quantity:'half',
                price: 100.00,
                makingTime:5,
                itemtype:'Veg',
                description:'special rasmalai ,full-4 pcs.,half-2pcs.....',
                cuisine: 'North-Indian'
              }
            ]
          }
        ];
        localStorage.setItem('menuCategories', JSON.stringify(menuCategories));      
      }
      else {
        console.log("Loaded the menuCategories from local storage ...");
      }
    }
  }
  