import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipesChangedEvent = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];
 
  //  private recipes: Recipe[] = [
  //     new Recipe(
  //       'Shrimp Pasta', 
  //       'Delicious shrimp on a bed of spinach pasta.', 
  //       'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
  //       [
  //         new Ingredient('Shrimp', 12),
  //         new Ingredient('Pasta', 1)
  //       ]),
  //     new Recipe(
  //       'Another Test Recipe', 
  //       'This is a test',
  //       'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
  //       [
  //         new Ingredient('Bread', 1),
  //         new Ingredient('Meat', 1)
  //       ])
  //   ];

    constructor(private slService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]) {
      this.recipes = recipes;
      this.recipesChangedEvent.next(this.recipes.slice());
    }

    getRecipes() {
      return this.recipes.slice();
    }

    getRecipe(index: number) {
      return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
      this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.recipesChangedEvent.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
      this.recipes[index] = newRecipe;
      this.recipesChangedEvent.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.recipesChangedEvent.next(this.recipes.slice());
    }
}