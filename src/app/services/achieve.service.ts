import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product} from '../model/note/note.model';
@Injectable()
export class AchieveService {

  constructor(private db: AngularFireDatabase) { }

}
