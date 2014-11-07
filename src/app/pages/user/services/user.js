/*
 Customer service
 @return: customer objects
 */
var p5CustomerServices = angular.module('p5CustomerServices', []);

p5CustomerServices.service('CustomerService', function () {
  var customers = [
    {
      id: '1',
      number: '0623456567',
      email: 'ndotrong@pentalog.fr',
      origine: 'Nordnet',
      etat_du_compte: 'Opérationnel',
      offre: 'Premium',
      created_date: '18.1 mois',
      end_date: '01/12/2015',
      disabled_at: 1,
      msisdn: '0623432345'
    },
    {
      id: '2',
      number: '0623456567',
      email: 'mathieu@pentalog.fr',
      origine: 'Nordnet',
      etat_du_compte: 'Opérationnel',
      offre: 'Premium',
      created_date: '18.1 mois',
      end_date: '01/12/2015',
      disabled_at: 1,
      msisdn: '0623432345'
    },
    {
      id: '3',
      number: '0623456567',
      email: 'sonnguyen@pentalog.fr',
      origine: 'Nordnet',
      etat_du_compte: 'Résilié',
      offre: 'Premium',
      created_date: '18.1 mois',
      end_date: '01/12/2015',
      disabled_at: 1,
      msisdn: '0623432345'
    },
    {
      id: '4',
      number: '0623456567',
      email: 'mrio@pentalog.fr',
      origine: 'Nordnet',
      etat_du_compte: 'Opérationnel',
      offre: 'Premium',
      created_date: '18.1 mois',
      end_date: '01/12/2015',
      disabled_at: 1,
      msisdn: '0623432345'
    },
    {
      id: '5',
      number: '0623456567',
      email: 'coralie@pentalog.fr',
      origine: 'Orange',
      etat_du_compte: 'Suspendu',
      offre: 'Premium',
      created_date: '18.1 mois',
      end_date: '01/12/2015',
      disabled_at: 1,
      msisdn: '0623432345'
    }
  ];
  /*
   Get all customer
   */
  this.getCustomers = function () {
    return customers;
  }

  /*
   Filter customer by email or phone number
   */
  this.addFilter = function (valueFilter) {
    var results = [];
    for (i in customers) {
      if (valueFilter == customers[i].email || valueFilter == customers[i].number) {
        results.push(customers[i]);
      }
    }
    return results;
  }

  /*
  Check customer responsive isEmpty or not
   */
  this.isEmpty = function(customerList){
    console.log(customerList);
    if(angular.equals([], customerList)){
      return true;
    }else{
      return false;
    }
  }
});