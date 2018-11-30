var webpack = require("webpack");

module.exports = {
    entry: "./es/app.jsx",
    //entry: "./es/app.js",
    output: {
        // code splitting
        filename: "[name].bundle.js",
        path: __dirname + "/dist",
        publicPath: "/static/dist/"
    },
  
    // activa sourcemaps para debugging con la salida de webpack
    devtool: "source-map",
  
    resolve: {
        // añadir '.ts' y '.tsx' como extensiones a resolver
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },
  
    module: {
        rules: [
            // Todos los ficheros con extensión '.ts' o '.tsx' serán controlados por 'awesome-typescript-loader'.
            //{ test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            {test: /\.jsx?$/, loader: 'babel-loader'},
            // Todos los ficheros de salida '.js' tendrán todos los sourcemaps reprocesados por 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    /*
    // Cuando importamos un modulo el cual su ruta concuerda con una de las siguientes,
    // solo asume que existe una variable global correspondiente y usa eso en su lugar.
    // Esto es importante porque nos permite evitar agrupar todas nuestras dependencias, 
    // lo que permite a los navegadores almacenar en caché estas librerias entre compilaciones.
    externals: {
        "redux": "Redux",
        "react": "React",
        "react-dom": "ReactDOM"
    }
    */
   externals: {
        //"i18next": "i18next", // si no se externaliza i18next, 
                              // la librería no funciona en producción
    }
  };