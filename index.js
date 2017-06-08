// jshint node:true
/* global process */
'use strict';

let path = require('path');
let Funnel = require('broccoli-funnel');
let MergeTrees = require('broccoli-merge-trees');
let map = require('broccoli-stew').map;

module.exports = {

  name: 'ember-gestures',

  included: function (app) {
    this._super.included.apply(this, arguments);

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    if (!process.env.EMBER_CLI_FASTBOOT) {
      app.import('vendor/hammer.js');
    }
  },

  treeForVendor(vendorTree) {
    let hammerTree = new Funnel(path.dirname(require.resolve('hammerjs')), {
      files: ['hammer.js']
    });
    hammerTree = map(hammerTree, (content) => `if (typeof FastBoot === 'undefined') { ${content} }`);

    var trees = [
      hammerTree
    ];

    if (vendorTrees) {
      trees.push(vendorTree);
    }

    return new MergeTrees(trees);
  },

  isDevelopingAddon: function() {
    return false;
  }

};
