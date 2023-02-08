import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
   recipeSelected = new EventEmitter<Recipe>();

   private recipes: Recipe[] = [
      new Recipe(
        'Shrimp Pasta', 
        'Delicious shrimp on a bed of spinach pasta.', 
        'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
        [
          new Ingredient('Shrimp', 12),
          new Ingredient('Pasta', 1)
        ]),
      new Recipe(
        'Another Test Recipe', 
        'This is a test',
        'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
        [
          new Ingredient('Bread', 1),
          new Ingredient('Meat', 1)
        ])
    ];

    constructor(private slService: ShoppingListService) {}

    getRecipes() {
      return this.recipes.slice();
    }

    getRecipe(index: number) {
      return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
      this.slService.addIngredients(ingredients);
    }
}