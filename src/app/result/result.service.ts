import { Injectable } from '@angular/core';
import { ResultModel } from './model/result.model';
import { ResultEventModel } from './model/result-event.model';
import { unusedValueExportToPlacateAjd } from '@angular/core/src/render3/interfaces/injector';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor() { }

  public addResult(newResult:ResultModel) {
    
  }

  public seenResult(idResult:number) {
    
  }

  public unseenResult(idResult:number) {
    
  }

  public getAllResult() : Array<ResultModel> {
    return [];
  }

  public getAllResultSeen() : Array<ResultModel> {
    return null;
  }

  public getAllResultUnSeen() : Array<ResultModel> {
    return null;
  }

  public numberOfEventSeen() : number
  {
    return null;
  }
}