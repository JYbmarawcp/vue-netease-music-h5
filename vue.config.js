module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/style/variable.scss";
          @import "@/style/mixin.scss";
        `,
      },
    },
  },
}