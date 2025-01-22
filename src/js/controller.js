import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import recipeView from './views/recipeView';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

///////////////////////////////////////

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) recipeView.renderSpinner();
    //1) Loading Recipe

    await model.loadRecipe(id);

    ///Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

showRecipe();
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));

// window.addEventListener('hashchange', showRecipe);
