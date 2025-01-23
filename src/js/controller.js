import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) recipeView.renderSpinner();
    //1) Loading Recipe

    await model.loadRecipe(id);

    ///Rendering recipe
    recipeView.renderSpinner();
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(`${err} 🥼🥼🥼🥼`);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchRecipe(query);
    console.log(model.state.search.results);
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};
init();

// window.addEventListener('hashchange', showRecipe);
