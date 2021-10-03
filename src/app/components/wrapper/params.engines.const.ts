export class ParamsEnginesConst {
    public PARAMS = {
        web: {
          'mail.ru': 'https://go.mail.ru/search?q=<TEMPLATE>',
          'yandex': 'https://yandex.ru/search/?text=<TEMPLATE>',
          'yahoo': 'https://search.yahoo.com/search?p=<TEMPLATE>',
          'bing': 'https://www.bing.com/search?q=<TEMPLATE>'
        },
        images: {
          'mail.ru': 'https://go.mail.ru/search_images?q=<TEMPLATE>',
          'yandex': 'https://yandex.ru/images/search?text=<TEMPLATE>',
          'yahoo': 'https://images.search.yahoo.com/search/images?p=<TEMPLATE>',
          'bing': 'https://www.bing.com/images/search?q=<TEMPLATE>'
        },
        videos: {
          'mail.ru': 'https://go.mail.ru/search_video?q=<TEMPLATE>',
          'yandex': 'https://yandex.ru/video/search?text=<TEMPLATE>',
          'yahoo': 'https://video.search.yahoo.com/search/video?p=<TEMPLATE>',
          'bing': 'https://www.bing.com/videos/search?q=<TEMPLATE>'
        }
      }
    public ENGINES = [
        {
          value: this.PARAMS, 
          viewValue: 'mail.ru'
        },
        {
          value: this.PARAMS, 
          viewValue: 'Yandex'
        },
        {
          value: this.PARAMS, 
          viewValue: 'Yahoo'
        },
        {
          value: this.PARAMS,
          viewValue: 'Bing'
        }
      ];

    public COLORS = ['#0099f3', '#00a8aa', '#303030', '#28a900', '#2c87ff', '#3e00e1', '#5ba400', '#777777', '#9100ff', '#ff6c00', '#ff0069', '#ff1600', '#ffac00', '#e91b00', '#ffffff']
    public IMAGES = ['beach.jpg', 'grass.jpg'];
    public ROOT = './assets/image/';
}