import { TestBed, fakeAsync } from '@angular/core/testing';
import { ResultService } from './result.service';
import { ResultModel } from './model/result.model';

import { ResultEventModel } from './model/result-event.model';

describe('ResultService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  let resultService: ResultService;

  it('should be created', () => {
    resultService = TestBed.get(ResultService);
    expect(resultService).toBeTruthy();
  });


  /* step 1 : initialisation du projet avec 0 et 1 resultat */
  it('devrait être initialisé avec une liste de résultat vide',
    fakeAsync(() => {
      expect(resultService.getAllResult()).toEqual([]);
    })
  );

  describe("aprés l'ajout d'un résultat,", () => {
    beforeEach(() => {
      const result: ResultModel = {id: 46,idOwner:76,idRecipients:[42],isSeen:false,eventResults:[],contentOfResult:"Test"};
      resultService = new ResultService();
      resultService.addResult(result);
    });

    it('devrait avoir une liste de 1 résultat non vue',
      fakeAsync(() => {
        expect(resultService.getAllResult().length).toEqual(1);
      })
    );

    it('devrait avoir une liste de 1 résultat vue aprés la vision de ce résultat',
      fakeAsync(() => {
        resultService.seenResult(46);
        expect(resultService.getAllResultSeen().length).toEqual(1);
        expect(resultService.getAllResult()[0].isSeen).toEqual(true);
      })
    )
  });

  /* step 2 : 3 resultats */
  describe("aprés l'ajout de 3 resultats,", () => {
    beforeEach(() => {
      // init le service avec 3 resultats
	  const result1: ResultModel = {id: 1,idOwner:11,idRecipients:[],isSeen:false,eventResults:[],contentOfResult:"Test1"};
	  const result2: ResultModel = {id: 2,idOwner:22,idRecipients:[],isSeen:false,eventResults:[],contentOfResult:"Test2"};
	  const result3: ResultModel = {id: 3,idOwner:33,idRecipients:[],isSeen:false,eventResults:[],contentOfResult:"Test3"};
	  const result4: ResultModel = {id: 3,idOwner:33,idRecipients:[],isSeen:false,eventResults:[],contentOfResult:"Test4"};
      resultService = new ResultService();
      resultService.addResult(result1);
	  resultService.addResult(result2);
	  resultService.addResult(result3);
	  
	  // Décommenter pour test de l'ajout d'un résultat avec un id existent
	  //resultService.addResult(result4);
	  
    });

    it("devrait avoir une liste de 3 resultats non vue aprés l\'ajout de 3 resultat.",
      fakeAsync(() => {
        expect(resultService.getAllResult().length).toEqual(3);
		for (var i = 0; i < resultService.getAllResult().length; i++) {
				expect(resultService.getAllResult()[i].isSeen).toEqual(false);
			}		
      })
    );

    it("ne devrait pas authorisé l'ajout d'un résultats avec un id existent",
      fakeAsync(() => {
		  
		for (var i = 0; i < resultService.getAllResult().length; i++) {
					
			// Décommenter pour test de l'ajout d'un résultat avec un id existent
			//expect(resultService.getAllResult()[3].id - resultService.getAllResult()[i].id).not.toEqual(0);
			
			}		
      })
    );

    it("devrait avoir 1 resultats vue dans la liste aprés la vision d\'un resultat",
      fakeAsync(() => {
		resultService.seenResult(3);
		expect(resultService.getAllResultSeen().length).toEqual(1);
		expect(resultService.getAllResult()[2].isSeen).toEqual(true);	
      })
    );

    it("devrait avoir les 3 resultats vue dans la liste aprés qu\'il soit tous vue",
      fakeAsync(() => {
        resultService.seenResult(1);
		resultService.seenResult(2);
		resultService.seenResult(3);
		for (var i = 0; i < resultService.getAllResult().length; i++) {
				expect(resultService.getAllResult()[i].isSeen).toEqual(true);
			}		
        expect(resultService.getAllResultSeen().length).toEqual(3);
      })
    );

    it("devrait avoir plus que 2 resultats vue dans la liste aprés qu\'il soit tous vue puis 1 ou la vue est enlevé",
      fakeAsync(() => {
        resultService.seenResult(1);
		resultService.seenResult(2);
		resultService.seenResult(3);
		resultService.unseenResult(3);
		expect(resultService.getAllResult()[0].isSeen).toEqual(true);
		expect(resultService.getAllResult()[1].isSeen).toEqual(true);
		expect(resultService.getAllResult()[2].isSeen).toEqual(false);
		expect(resultService.getAllResultSeen().length).toEqual(2);
		expect(resultService.getAllResultUnSeen().length).toEqual(1);
      })
    );

    it("ne devrait pas planté aprés la vision d\'un resultat non ajouté",
      fakeAsync(() => {

			resultService.seenResult(4);
			for (var i = 0; i < resultService.getAllResult().length; i++) {
					expect(resultService.getAllResult()[i].isSeen).not.toBeTruthy();
			}					
	  })
	  )
  });


  /* step 3 (evenement) */
  describe(",aprés l\'ajout de 3 resultats,", () => {
		
    beforeEach(() => {
      // init le service avec 3 resultats (doit etre identique que le step 2)
	  const result1: ResultModel = {id: 1,idOwner:11,idRecipients:[],isSeen:false,eventResults:[],contentOfResult:"Test1"};
	  const result2: ResultModel = {id: 2,idOwner:22,idRecipients:[],isSeen:false,eventResults:[],contentOfResult:"Test2"};
	  const result3: ResultModel = {id: 3,idOwner:33,idRecipients:[],isSeen:false,eventResults:[],contentOfResult:"Test3"};
      resultService = new ResultService();
	  resultService.addResult(result1);
	  resultService.addResult(result2);
	  resultService.addResult(result3);
    });

    //ps : je ne veux pas que les event de création soi initialisé dans le beforeEach ci dessus mais directement dans le resultService
    it("devrait avoir la list des résultat dans l\'order de création ( en se basant sur les events de création)",
      fakeAsync(() => {
				for (var i = 0; i < resultService.getAllResult().length; i++) {
					expect(resultService.getAllResult()[i].eventResults[0].createdAt.getMilliseconds()).toEqual(new Date ().getMilliseconds());
					expect(resultService.getAllResult()[i].eventResults[0].id).toBe('created');
			}				
      })
    );

    it("devrait avoir 1 event a la date de maintenant quand 1 résultat est vue",
      fakeAsync(() => {
		  
		resultService.seenResult(1);
		expect(resultService.getAllResult()[0].eventResults[1].createdAt.getMilliseconds()).toEqual(new Date().getMilliseconds());
		expect(resultService.getAllResult()[0].eventResults[1].id).toBe('seen');
      })
    );

    it("devrait avoir 2 events avec 2 dates différent aprés la vision d\'un resultat puis la suppression de la vision",
      fakeAsync(() => {
        expect(false).toEqual(true);
		// resultService.seenResult(1);
		// resultService.unseenResult(1);
		// expect(resultService.getAllResult()[1].eventResults[0].createdAt.getTime()).toEqual(new Date().getTime());
		// expect(resultService.getAllResult()[1].eventResults[0].createdAt.getTime()).toEqual(new Date().getTime());
      })
    );

    it("devrait avoir une fonction qui retourne une liste ordonnée des resultats par rapport au dernier modifier",
      fakeAsync(() => {
        expect(false).toEqual(true);
      })
    );

  });


  /* proposé de nouveau test */


	/*# bugfix

	> balise ul au lieu de de div dans app.componenent
	> @angular/platform-browser-dynamic": "~8.0.0" au lieu de ~7.2.0 (bug compilater)

	*/






});
