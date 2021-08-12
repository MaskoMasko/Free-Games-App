AHHHH STORE MAKES ME GO NOOOOOO!

things to do:
-filteranje po svemu DONE
-make genres touchable DONE
-napravi svoje hookove
-active gledas idk

po mogucnosti cili api file staviti u store ali zasad neka stoji

moren koristiti react elements jako je kul ima kompp ke ti rabe believe:!:!:!:!:!

I HAVE TRIED SHOPIFY/RESTYLE LIB AND I DON'T REALLY LIKE IT SO YEAH.... back to the start ili se nauciti kako oni to delaju custom components
ubija mi cesto expo na mobu (nez za na pcu)

u views getter stavlja:
getSnapshot - getSnapshot(model, applyPostProcess): returns a snapshot representing the current state of the model
(i to dosta njih)
-nez ca je tryRefrence
-nike jednostavne stvari - provjerava dali je user loginan, dobije niki item z liste, zbrajanje zbroja, array od mapa, mapiranje, filteranje, counter, booleans, returna url

generics typescript:
function funcName<T>(prop:T):T[]{

}
T predstvalja Type
primjer:
const notStringArray: string[] = funcName({}) --> passamo obj ne array
const stringArray = funcName<string>("") --> tako dela
ako imamo interface:
interface Nisto{
name:string
}
function nikiName<T extends Nisto>(nekiArray:T[]){
i onda se more
nekiArray.forEach((e)=>e.name)
}

wtf?
interface CacheHost {
save: (a: any) => void;
}

PUT OVE FUNK: Cache->CacheHost->T
function addObjectToCache<T, Cache extends CacheHost>(obj: T, cache: Cache): Cache {
cache.save(obj);
return cache;
}

postoji Partial<Props> i Required<Props> i Readonly<Props> -(nemore se promjeniti)
Record<T1, T2>
Record constructs an object type whose property keys are Keys and whose property values are Type. This utility can be used to map the properties of a type to another type.

posoje jos i Pick i Omit ali me ne zanimaju tako da :)
