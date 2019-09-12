import ak from './us-flags/ak.png';
import al from './us-flags/al.png';
import ar from './us-flags/ar.png';
import az from './us-flags/az.png';
import ca from './us-flags/ca.png';
import co from './us-flags/co.png';
import ct from './us-flags/ct.png';
import de from './us-flags/de.png';
import fl from './us-flags/fl.png';
import ga from './us-flags/ga.png';
import hi from './us-flags/hi.png';
import ia from './us-flags/ia.png';
import id from './us-flags/id.png';
import st_in from './us-flags/in.png';
import il from './us-flags/il.png';
import ks from './us-flags/ks.png';
import ky from './us-flags/ky.png';
import la from './us-flags/la.png';
import ma from './us-flags/ma.png';
import me from './us-flags/me.png';
import md from './us-flags/md.png';
import mi from './us-flags/mi.png';
import mn from './us-flags/mn.png';
import mo from './us-flags/mo.png';
import ms from './us-flags/ms.png';
import mt from './us-flags/mt.png';
import nc from './us-flags/nc.png';
import nd from './us-flags/nd.png';
import ne from './us-flags/ne.png';
import nh from './us-flags/nh.png';
import nj from './us-flags/nj.png';
import ny from './us-flags/ny.png';
import nm from './us-flags/nm.png';
import nv from './us-flags/nv.png';
import oh from './us-flags/oh.png';
import ok from './us-flags/ok.png';
import or from './us-flags/or.png';
import pa from './us-flags/pa.png';
import ri from './us-flags/ri.png';
import sc from './us-flags/sc.png';
import sd from './us-flags/sd.png';
import tn from './us-flags/tn.png';
import tx from './us-flags/tx.png';
import ut from './us-flags/ut.png';
import va from './us-flags/va.png';
import vt from './us-flags/vt.png';
import wa from './us-flags/wa.png';
import wi from './us-flags/wi.png';
import wv from './us-flags/wv.png';
import wy from './us-flags/wy.png';

interface FlagIcons {
  [key: string]: string
}

const flags: FlagIcons = {
  ak, al, ar, az, ca, co, ct, de, fl,
  ga, hi, ia, id, in: st_in, il, ks, ky, la, ma, me, md, mi, mn, mo, ms, mt, nc, nd, ne, nh, nj, ny,
  nm, nv, oh, ok, or, pa, ri, sc, sd, tn, tx, ut, va, vt, wa, wi, wv, wy
};

export { flags };

