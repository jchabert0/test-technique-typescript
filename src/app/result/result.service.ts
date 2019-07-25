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
	  
		newResult.eventResults.push(
			{id: 'created', idOwner: newResult.idOwner, createdAt: new Date()},
			{id: 'seen', idOwner: newResult.idOwner, createdAt: null},
		);
		this.results.push(newResult);
  }
	
  public seenResult(idResult:number) {
	for(var i = 0; i < this.results.length; i++) {
		if (this.results[i].id == idResult) {
			this.results[i].isSeen = true;
			this.results[i].eventResults[1].createdAt = new Date();
			}
		}
	}

  public unseenResult(idResult:number) {
    for(var i = 0; i < this.results.length; i++) {
		if (this.results[i].id == idResult) {
			this.results[i].isSeen = false;
			this.results[i].eventResults[0].createdAt = new Date();
			this.results[i].eventResults[1].createdAt = null;
			}
		}
  }

  public getAllResult() : Array<ResultModel> {
		
		return this.results.sort( function ( a, b ) {
		  if ( a.eventResults[0].createdAt.getTime() < b.eventResults[0].createdAt.getTime() ){
			return -1;
		  }
		  if ( a.eventResults[0].createdAt.getTime() > b.eventResults[0].createdAt.getTime() ){
			return 1;
		  }
		  return 0;
		});
  }

  public getAllResultSeen() : Array<ResultModel> {
	return this.results.filter(function (el) {return el.isSeen == true});	
  }

  public getAllResultUnSeen() : Array<ResultModel> {
    return this.results.filter(function (el) {return el.isSeen == false});
  }
  
  public getEditOrder() : Array<ResultModel> {
	  return null;
		/*  
		return this.results.sort( function ( a, b ) {
		  if ( 
		  a.eventResults[0].createdAt.getTime() < b.eventResults[0].createdAt.getTime() &&
		  a.eventResults[1].createdAt.getTime() < b.eventResults[0].createdAt.getTime() &&
		  a.eventResults[0].createdAt.getTime() < b.eventResults[1].createdAt.getTime() &&
		  a.eventResults[1].createdAt.getTime() < b.eventResults[1].createdAt.getTime()
		  ){
			return -1;
		  }
		  if (
		  a.eventResults[0].createdAt.getTime() > b.eventResults[0].createdAt.getTime() &&
		  a.eventResults[1].createdAt.getTime() > b.eventResults[0].createdAt.getTime() &&
		  a.eventResults[0].createdAt.getTime() > b.eventResults[1].createdAt.getTime() &&
		  a.eventResults[1].createdAt.getTime() > b.eventResults[1].createdAt.getTime()
		  ){
			return 1;
		  }
		  return 0;
		});  */
  }
}
