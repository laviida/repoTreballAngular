export interface NewsUser {
  gender: string;
  name: Object; //{"title":"Mr","first":"Danial","last":"Herheim"}
  location: Object; //{"street":{"number":9560,"name":"Bekkenstenveien"},"city":"Blomvåg","state":"Oppland","country":"Norway","postcode":"7982","coordinates":{"latitude":"55.5820","longitude":"-136.5628"},"timezone":{"offset":"+5:00","description":"Ekaterinburg, Islamabad, Karachi, Tashkent"}};
  email: string;
  login: Object; //{"uuid":"25af0093-8cdf-4dd3-b17a-868da58b9dad","username":"lazymouse559","password":"bamboo","salt":"HY18ZYm0","md5":"b4ea7425abfdd72c5852132c41b931ce","sha1":"2201cfe97f7c00ed114d4ae73ec0a1ee118838f9","sha256":"c11e773f322793b65773c60f5489771e2a090df63db0c9f733085c4989c1250c"}
  dob: Object; //{"date":"1965-12-07T19:05:05.866Z","age":56},
  registered: Object; //{"date":"2011-05-17T21:21:52.197Z","age":10},
  phone: string;
  cell: string;
  id: Object; //{"name":"FN","value":"07126546372"},
  picture: Object; //{"large":"https://randomuser.me/api/portraits/men/81.jpg","medium":"https://randomuser.me/api/portraits/med/men/81.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/81.jpg"},
  nat: string;
}
