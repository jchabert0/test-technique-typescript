import { Injectable } from '@angular/core';
import { ResultModel } from './model/result.model';
import { ResultEventModel } from './model/result-event.model';
import { unusedValueExportToPlacateAjd } from '@angular/core/src/render3/interfaces/injector';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
	
public results: ResultModel[];

  constructor() 
  
  {
	this.results = new Array<ResultModel>();
  }

  public addResult(newResult:ResultModel) {
		this.results.push(newResult);
	}	

  public seenResult(idResult:number) {
	for(var i = 0; i < this.results.length; i++) {
		if (this.results[i].id == idResult) {
				this.results[i].isSeen = true;
			}
		}
	}

  public unseenResult(idResult:number) {
    
  }

  public getAllResult() : Array<ResultModel> {
    return this.results;
  }

  public getAllResultSeen() : Array<ResultModel> {
	return this.results.filter(function (el) {return el.isSeen = true});
  }

  public getAllResultUnSeen() : Array<ResultModel> {
    return null;
  }

  public numberOfEventSeen() : number
  {
    return null;
  }
}
