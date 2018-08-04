 
    function Islem(GelenIslem) {
        var GelenVeri_Y = GelenIslem;
        var GelenVeri = GelenIslem;
        var Parantez_yedek = "";
        var cozum_parcala = new Array();
        var Parantez_Yakalama = false;
        var Acilan_parantez = 0;
        var Parantez_Ici = ""; 
            if (GelenIslem == "") 
                GelenVeri = "0";
        var Cozum = "";
        GelenVeri="("+GelenVeri+")";
        GelenVeri = GelenVeri.replace(" ", "");
        GelenVeri = GelenVeri.replace(",", ".");  
                
        var parca_tut="";
        var toplam_islem=0;     
        while (true)
        {            
             for (var i = 0; i < GelenVeri.length; i++)
             {
                 parca_tut=GelenVeri.substr(i,1);
                       
                 if (parca_tut == "(")
                 {
                     Parantez_Yakalama = true; Acilan_parantez++;
                     if (Acilan_parantez > 1) { Parantez_Ici = ""; } continue;
                 }
                     if (parca_tut == ")") { Parantez_Yakalama = false; break; }
                     if (Parantez_Yakalama) { Parantez_Ici = Parantez_Ici +parca_tut; }                       
                 }
                Parantez_yedek = Parantez_Ici;
     
                while (true)
                {
                    Parantez_Ici = Parantez_Ici.replace("+-", "-");
                    Parantez_Ici = Parantez_Ici.replace("-+", "-");
                    Parantez_Ici = IlkIsaretKontrol(Parantez_Ici);

                    var ID = Parantez_Ici.indexOf('^');

                     if (ID > 0)
                    {
                       Cozum = TerimAyirici(Parantez_Ici, ID);
                       cozum_parcala = Cozum.split('?');
                       Parantez_Ici = Parantez_Ici.replace(cozum_parcala[0], cozum_parcala[1]);
                        toplam_islem++;
                        continue;
                    }
                    
                     ID = Parantez_Ici.indexOf('*');

                    if (ID > 0)
                    {
                        Cozum = TerimAyirici(Parantez_Ici, ID);
                        cozum_parcala = Cozum.split('?');
                        Parantez_Ici = Parantez_Ici.replace(cozum_parcala[0], cozum_parcala[1]);
                          toplam_islem++;
                        continue;
                    }

                    ID = Parantez_Ici.indexOf('%');

                    if (ID > 0)
                    {
                        Cozum = TerimAyirici(Parantez_Ici, ID);
                        cozum_parcala = Cozum.split('?');
                        Parantez_Ici = Parantez_Ici.replace(cozum_parcala[0], cozum_parcala[1]);
                          toplam_islem++;
                        continue;
                    }

                    ID = Parantez_Ici.indexOf('/');

                    if (ID > 0)
                    {
                        Cozum = TerimAyirici(Parantez_Ici, ID);
                        cozum_parcala = Cozum.split('?');
                        Parantez_Ici = Parantez_Ici.replace(cozum_parcala[0], cozum_parcala[1]);
                         toplam_islem++;
                        continue;
                    }

                    ID = Parantez_Ici.indexOf('+');

                    if (ID > 0)
                    {
                        Cozum = TerimAyirici(Parantez_Ici, ID);
                        cozum_parcala = Cozum.split('?');
                        Parantez_Ici = Parantez_Ici.replace(cozum_parcala[0], cozum_parcala[1]);
                         toplam_islem++;
                        continue;
                    }

                    ID = EksiKontrol(Parantez_Ici, "-");

                    if (ID >= 0)
                    {
                        Cozum = TerimAyirici(Parantez_Ici, ID);
                        cozum_parcala = Cozum.split('?');
                        Parantez_Ici = Parantez_Ici.replace(cozum_parcala[0], cozum_parcala[1]);
                         toplam_islem++;
                        continue;
                    }
                     break;
                }
                  
            
            GelenVeri = GelenVeri.replace("(" + Parantez_yedek + ")", Parantez_Ici);
            if (!IslemKaldımı(GelenVeri)) break;
        }

            var text = '{ "FlowData" : [{ "Sonuc":"'+Parantez_Ici+'" , "Islem":"'+GelenVeri_Y+'" , "IslemSayi":"'+toplam_islem+'" , "KarakterS":"'+GelenVeri_Y.length+'"}]}';
            var obj = JSON.parse(text);
            var str = JSON.stringify(obj, null, 2);
              
        return str;
                 
}
          
function EksiKontrol(Gelen,islem)
{          
    var ID = 0;
    var sayac=0;
    var tut = 0;
                
    var parca_tut="";
    for (var i = 0; i < Gelen.trim().length; i++) { 
        parca_tut=Gelen.substr(i,1);
        if (parca_tut == "-") { ID++; } 
    }
               
    parca_tut=Gelen.substr(0,1);
    
    if (parca_tut == "-" && islem == "-")
    {
        for (var i = 0; i < Gelen.trim().length; i++) { 
            parca_tut=Gelen.substr(i,1);
            if (parca_tut == "-") {  sayac++;  }    
            if (ID == sayac) { continue; }
            tut++; 
                    }  
           }        
           else 
           {    
               for (var i = 0; i < Gelen.trim().length; i++) { 
                   parca_tut=Gelen.substr(i,1);
                    if (parca_tut != "-"){ tut++; } else { break; } }
           }
          
    parca_tut=Gelen.substr(0,1);  
    if ((ID == 1) && parca_tut == "-") tut = -1;
    if (ID == 0) tut = -1;
    return tut;
} 

function IlkIsaretKontrol(GelenTerim)
{   
    var  parca_tut="";
    parca_tut=GelenTerim.substr(0,1);
    if (parca_tut == "+")
        GelenTerim = GelenTerim.substr(1,GelenTerim.length-1);

    return GelenTerim;
}

function TerimAyirici(Terim,ID)         
{
    var Opetorler = "*//+-%"; 
    var parca_tut=Terim.substr(ID,1);
    var Islem_turu =parca_tut; 
    var veri1 = "";
    var veri2 = "";
    var pozitif= "";
    var isaret1 =true;
    var isaret2 = true;   
    var sonuc = 0;
    var i = 1;
    var eksisayi = 0;
                
    for (i = ID+1; i <= Terim.length-1; i++)
                {
                    parca_tut=Terim.substr(ID+1,1);
                    if (eksisayi < 1) { if ((parca_tut == '-')) { eksisayi++; isaret2 = false; continue; } }
                    parca_tut=Terim.substr(i,1);
                    if ((Opetorler.indexOf(parca_tut) < 0)){ veri2 = veri2 + parca_tut;
                                                            if (!isaret2) veri2 = "-" + veri2;
                }
                    else {break;}
                }         
  
    for (var a =ID-1; a >=0 ; a--)
    {
        parca_tut=Terim.substr(a,1);
        if (parca_tut == '-') { veri1 = "-" + veri1; isaret1 = false; }
        if (Opetorler.indexOf(parca_tut) < 0) { veri1 = parca_tut + veri1;   }
        else { break; }
    }
    
    sonuc = Matematikci((veri1), (veri2), Islem_turu);      
                 
    if ((!isaret1 && isaret2 && ((veri1) < (veri2)))  || (!isaret1&&!isaret2&&Islem_turu=="*"))
    { pozitif = "+"; }         
                
    return veri1 + Islem_turu + veri2+"?"+pozitif+sonuc;
             
}            
function Matematikci(_veri1, _veri2, islem_turu)
{
    var sonuc = 0;    
    var veri1=parseFloat(_veri1);
    var  veri2=parseFloat(_veri2);
             
    if (islem_turu == "*") { sonuc = veri1 * veri2; }
    if (islem_turu == "/") { sonuc = veri1 / veri2; }
    if (islem_turu == "+") { sonuc = veri1 + veri2; }
    if (islem_turu == "-") { sonuc = veri1 - veri2; }
    if (islem_turu == "%") { sonuc = veri1 % veri2; }
    if (islem_turu == "^") { sonuc = Math.pow(veri1, veri2); }
             
    return sonuc;
}
             
function IslemKaldımı(Islem)
{
    var Opetorler = "/*+%//";
    var IslemVar = false;
    
    for (var i = 0; i <= Islem.length - 1; i++)
    {
        var parca_tut=Islem.substr(i,1);
        if ((Opetorler.indexOf((parca_tut)) >= 0)||(Islem.indexOf('-')>1))
        {IslemVar = true;}
    }         
    return IslemVar;
}       
    
function syntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<p class="' + cls + '">' + match + '</p>';
    });
}