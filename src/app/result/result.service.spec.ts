import { TestBed, fakeAsync } from '@angular/core/testing';
import { ResultService } from './result.service';
import { ResultModel } from './model/result.model';

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
    );
  });

  /* step 2 : 3 resultats */
  describe("aprés l'ajout de 3 resultats,", () => {
    beforeEach(() => {
      // init le service avec 3 resultats
	  const result1: ResultModel = {id: 1,idOwner:11,idRecipients:[111],isSeen:false,eventResults:[],contentOfResult:"Test1"};
	  const result2: ResultModel = {id: 2,idOwner:22,idRecipients:[222],isSeen:false,eventResults:[],contentOfResult:"Test2"};
	  const result3: ResultModel = {id: 3,idOwner:33,idRecipients:[333],isSeen:false,eventResults:[],contentOfResult:"Test3"};
	  const result4: ResultModel = {id: 3,idOwner:33,idRecipients:[333],isSeen:false,eventResults:[],contentOfResult:"Test4"};
      resultService = new ResultService();
      resultService.addResult(result1);
	  resultService.addResult(result2);
	  resultService.addResult(result3);
	  // Décommenter pour test de l'ajout d'un résultat avec un id existent
	  // resultService.addResult(result4);
    });

    it("devrait avoir une liste de 3 resultats non vue aprés l\'ajout de 3 resultat.",
      fakeAsync(() => {
        expect(resultService.getAllResult().length).toEqual(3);
      })
    );

    it("ne devrait pas authorisé l'ajout d'un résultats avec un id existent",
      fakeAsync(() => {
		    for(var i = 0; i < resultService.getAllResult().length; i++) {
				var arrayId = [];
				arrayId.push(resultService.getAllResult()[i].id);
				var arrayIdDescending = arrayId.sort((a, b) => a - b); // on tri le tableau contenant les id des résultats pour rendre le calcul qui suit efficace
					for(var y = 0; y < arrayIdDescending.length; y++) {
					expect(Math.abs( arrayIdDescending[y++] - arrayIdDescending[y] )).not.toEqual(0);
					//expect(Math.abs( resultService.getAllResult()[i].id - resultService.getAllResult()[i++].id )).toEqual(0);
					}
			}
      })
    );

    it("devrait avoir 1 resultats vue dans la liste aprés la vision d\'un resultat",
      fakeAsync(() => {
        expect(false).toEqual(true);
      })
    );

    it("devrait avoir les 3 resultats vue dans la liste aprés qu\'il soit tous vue",
      fakeAsync(() => {
        expect(false).toEqual(true);
      })
    );

    it("devrait avoir plus que 2 resultats vue dans la liste aprés qu\'il soit tous vue puis 1 ou la vue est enlevé",
      fakeAsync(() => {
        expect(false).toEqual(true);
      })
    );

    it("ne devrait pas planté aprés la vision d\'un resultat non ajouté",
      fakeAsync(() => {
        expect(false).toEqual(true);
      })
    );
  });


  /* step 3 (evenement) */
  describe(",aprés l\'ajout de 3 resultats,", () => {

    beforeEach(() => {
      // init le service avec 3 resultats (doit etre identique que le step 2)
    });

    //ps : je ne veux pas que les event de création soi initialisé dans le beforeEach ci dessus mais directement dans le resultService
    it("devrait avoir la list des résultat dans l\'order de création ( en se basant sur les events de création)",
      fakeAsync(() => {
        expect(false).toEqual(true);
      })
    );

    it("devrait avoir 1 event a la date de maintenant quand 1 résultat est vue",
      fakeAsync(() => {
        expect(false).toEqual(true);
      })
    );

    it("devrait avoir 2 events avec 2 dates différent aprés la vision d\'un resultat puis la suppression de la vision",
      fakeAsync(() => {
        expect(false).toEqual(true);
      })
    );

    it("devrait avoir une fonction qui retourne une liste ordonnée des resultats par rapport au dernier modifier",
      fakeAsync(() => {
        expect(false).toEqual(true);
      })
    );

  });


  /* proposé de nouveau test */

});
