export default {
  methods: {
    getDateInStringFormat(d: any): string {
      const month: string = d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (1 + d.getMonth());
      const day: string = d.getDate() > 9 ? d.getDate() : '0' + d.getDate();
      return month + '/' + day + '/' + d.getFullYear();
    },
  },
};
