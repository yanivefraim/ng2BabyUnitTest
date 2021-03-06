import {Injectable} from 'angular2/angular2';
import {Hero} from './hero';
import {Backend} from './backend';

@Injectable()
export class HeroService {

	constructor(private _backend: Backend) { }

	private _heroes: Hero[] = []; // cache of heroes
	private _getAllHeroesPromise: Promise<Hero[]>;

	getAllHeroes(force: boolean = false) {
		// getAll if force==true OR this is the first time through
		force = force || !this._getAllHeroesPromise
		if (!force) {
			return this._getAllHeroesPromise;
		}

		this._getAllHeroesPromise = this._backend.fetchAllHeroesAsync()
			.then(heroes => this._heroes = heroes);

		return this._getAllHeroesPromise;
	}

	removeHero(hero: Hero) {
		let ix = this._heroes.indexOf(hero);
		if (ix > -1) {
			this._heroes.splice(ix, 1);
			return true;
		} else {
			return false;
		}
	}
}
