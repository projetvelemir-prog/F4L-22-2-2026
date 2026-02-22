import { useState } from "react";

const BASELINE_IMAGES = {
  stable: "/images/stable_baseline.png",
  unstable1: "/images/us_baseline_1.png",
  unstable2: "/images/us_baseline_2.png",
};

const mkPlaceholder = (label, bg, fg) => "data:image/svg+xml;base64," + btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="120" viewBox="0 0 400 120"><rect fill="${bg}" width="400" height="120" rx="8"/><text x="200" y="65" text-anchor="middle" fill="${fg}" font-size="13" font-family="Georgia">${label}</text></svg>`);
const IMAGES = {
  image1_png: mkPlaceholder("CTG: Atypical sinusoidal","#f5f0ff","#7c3aed"),
  image2_jpg: mkPlaceholder("CTG: True acceleration","#f0fdf4","#10b981"),
  image3_png: mkPlaceholder("CTG: Reduced variability","#fef2f2","#dc2626"),
  image4_png: mkPlaceholder("CTG: Zigzag pattern","#fffbeb","#f59e0b"),
  image5_jpg: mkPlaceholder("CTG: Cycling","#eff6ff","#0ea5e9"),
  image6_jpg: mkPlaceholder("CTG: Shallow decelerations","#fef9ee","#b45309"),
  image7_png: mkPlaceholder("CTG: Pseudo-sinusoidal","#f0fdf4","#22c55e"),
  image8_jpg: mkPlaceholder("CTG: Normal variability","#f0f4ff","#3b82f6"),
  image9_png: mkPlaceholder("CTG: Typical sinusoidal","#fef2f2","#ef4444"),
  image10_png: mkPlaceholder("Baseline FHR norms by GA","#f5f0ff","#7c3aed"),
};

const PLACENTA_SVG = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PGRlZnM+PHJhZGlhbEdyYWRpZW50IGlkPSJwZyIgY3g9IjQyJSIgY3k9IjM4JSIgcj0iNTglIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZjRhMjYxIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjYjUzNDBhIi8+PC9yYWRpYWxHcmFkaWVudD48L2RlZnM+PGNpcmNsZSBjeD0iMTIiIGN5PSIyMyIgcj0iOCIgZmlsbD0idXJsKCNwZykiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjEyIiByPSI3IiBmaWxsPSJ1cmwoI3BnKSIvPjxjaXJjbGUgY3g9IjMyIiBjeT0iOSIgcj0iNyIgZmlsbD0idXJsKCNwZykiLz48Y2lyY2xlIGN4PSI0NCIgY3k9IjEyIiByPSI3IiBmaWxsPSJ1cmwoI3BnKSIvPjxjaXJjbGUgY3g9IjUyIiBjeT0iMjIiIHI9IjciIGZpbGw9InVybCgjcGcpIi8+PGNpcmNsZSBjeD0iNTQiIGN5PSIzNCIgcj0iNyIgZmlsbD0idXJsKCNwZykiLz48Y2lyY2xlIGN4PSI0OCIgY3k9IjQ0IiByPSI3IiBmaWxsPSJ1cmwoI3BnKSIvPjxjaXJjbGUgY3g9IjM1IiBjeT0iNDkiIHI9IjciIGZpbGw9InVybCgjcGcpIi8+PGNpcmNsZSBjeD0iMjIiIGN5PSI0NyIgcj0iNyIgZmlsbD0idXJsKCNwZykiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjM3IiByPSI3IiBmaWxsPSJ1cmwoI3BnKSIvPjxlbGxpcHNlIGN4PSIzMiIgY3k9IjMwIiByeD0iMjIiIHJ5PSIxOCIgZmlsbD0idXJsKCNwZykiLz48Y2lyY2xlIGN4PSIzMiIgY3k9IjMwIiByPSI1IiBmaWxsPSIjN2ExYzAwIiBvcGFjaXR5PSIwLjc1Ii8+PGNpcmNsZSBjeD0iMzIiIGN5PSIzMCIgcj0iMi41IiBmaWxsPSIjZTc0YzNjIi8+PC9zdmc+";

const helpContent = {
  q1: {
    physiology: { organ: "Central organs — Myocardium", meaning: "Baseline FHR stable and appropriate for gestational age", color: "#7c3aed", icon: "🫀" },
    title: "Baseline FHR STABLE and APPROPRIATE for gestational age?",
    sections: [
      { heading: "Stable vs Unstable Baseline", text: "The baseline fetal heart rate represents the number of cardiac contractions required to meet the fetus’s current metabolic needs. It reflects how hard the fetal heart must work to maintain adequate oxygen delivery to tissues. Just as in adults at rest, when metabolic demand is low, the heart pumps at a steady rate. If metabolic demand increases — during movement or stress — heart rate rises to match the increased oxygen requirement." },
      { heading: "Stable Baseline", text: "A stable baseline indicates that the fetal myocardium is functioning under aerobic conditions. Oxygen delivery is adequate, glycogen reserves are sufficient, and the cardiac conduction system is intact. The heart does not need to “fight” to maintain perfusion. The baseline appears steady and well regulated. This stability reflects metabolic balance and myocardial integrity." },
      { heading: "Unstable Baseline", text: "An unstable baseline suggests metabolic or myocardial compromise. Possible mechanisms include:", bullets: ["Transition toward anaerobic metabolism", "Depleted glycogen reserves", "Impaired oxygen delivery", "Dysfunction of the cardiac conduction system"] },
      { heading: null, text: "When the myocardium struggles to maintain adequate output, the baseline may fluctuate abnormally. This instability is a warning sign and may indicate significant fetal distress." },
      { heading: "Technical Definition", text: "A stable baseline FHR is the mean fetal heart rate over a 10-minute period, rounded to the nearest 5 bpm, excluding accelerations, decelerations, and periods of marked variability. At term, the normal range is 110–160 bpm. A stable baseline must be identifiable for at least 2 minutes in any 10-minute window." },
      { heading: "Why does the FHR slow down as pregnancy progresses?", text: "From 37 weeks onwards, the parasympathetic nervous system matures progressively:", bullets: ["At 37–38 weeks: baseline in the upper range (140–160 bpm) is expected.", "At 40–41 weeks: baseline in the lower range (110–140 bpm) is expected.", "The normal baseline FHR is expected below 150 bpm at 40 weeks and below 140 bpm at 41 weeks."] },
      { heading: "What does it mean when the FHR is higher than expected?", text: "A baseline FHR higher than expected for gestational age may indicate pre-existing stress through catecholamine release. The two main causes are:", bullets: ["Chronic fetal hypoxia", "Chorioamnionitis (intrauterine infection/inflammation)"] },
    ],
    images: ["baseline_stable", "baseline_unstable1", "baseline_unstable2", "image10_png"],
    imageLabels: ["Stable baseline — steady, well-regulated FHR", "Unstable baseline — progressive decline (step-ladder)", "Unstable baseline — erratic fluctuation", "Baseline FHR norms by gestational age"],
    references: ["Ayres-de-Campos D, Spong CY, Chandraharan E. FIGO consensus guidelines on intrapartum fetal monitoring: Cardiotocography. Int J Gynaecol Obstet. 2015;131(1):13-24.", "Amorim-Costa C et al. Longitudinal evaluation of computerized cardiotocographic parameters throughout pregnancy in normal fetuses: a prospective cohort study. Acta Obstet Gynecol Scand. 2016 Oct;95(10):1143-52.", "Ghi T, Di Pasquo E, Dall’Asta A, et al. Intrapartum fetal heart rate between 150 and 160 bpm at or after 40 weeks and labor outcome. Acta Obstet Gynecol Scand. 2021;100(3):548-554."],
  },
  q2: {
    physiology: { organ: "Central organs — Autonomic NS", meaning: "Normal variability and presence of cycling", color: "#0ea5e9", icon: "🧠" },
    title: "NORMAL variability?",
    sections: [
      { heading: null, text: "Variability refers to the natural oscillations in the FHR signal, measured as the average bandwidth amplitude over 1-minute segments." },
      { heading: "Normal variability (5–25 bpm)", text: "Reflects a healthy balance between the sympathetic and parasympathetic nervous systems." },
      { heading: "Reduced variability (<5 bpm)", text: "May indicate fetal sleep (benign) but when persistent (>45 min), raises concern for fetal compromise." },
      { heading: "Zigzag pattern (>25 bpm, ≥2 min)", text: "Represents excessive oscillation associated with acute fetal stress." },
      { heading: "Sinusoidal pattern", text: "Defined by: regular smooth undulation, amplitude 5–15 bpm, frequency 3–5 cycles/min, >30 min duration, absent accelerations. A sign of severe fetal compromise." },
      { heading: "Sinusoidal vs. pseudo-sinusoidal", text: "In pseudo-sinusoidal patterns, undulatory waveforms alternate with episodes of normal variability. This pattern is benign and requires no intervention." },
    ],
    images: ["image8_jpg","image3_png","image4_png","image9_png","image1_png","image7_png"],
    imageLabels: ["Normal variability","Reduced variability","Zigzag pattern","Typical sinusoidal","Atypical sinusoidal","Pseudo-sinusoidal (benign)"],
    references: ["Pereira S, Chandraharan E. Recognition of chronic hypoxia and pre-existing foetal injury on the cardiotocograph (CTG): Urgent need to think beyond the guidelines. Porto Biomed J. 2017 Jul-Aug;2(4):124-129.", "Chandraharan E, et al. International expert consensus on physiological CTG interpretation (2024). Eur J Obstet Gynecol. 2024;302:346-355."],
  },
  q3: {
    physiology: { organ: "Central organs — Autonomic NS", meaning: "Normal variability and presence of cycling", color: "#0ea5e9", icon: "🧠" },
    title: "CYCLING present?",
    sections: [
      { heading: null, text: "Cycling refers to the alternation between epochs of normal and reduced variability, reflecting fetal behavioural states (active/quiet sleep)." },
      { heading: "What does cycling tell us?", text: null, bullets: ["Active sleep: normal variability with accelerations.", "Quiet sleep: physiologically reduced variability."] },
      { heading: null, text: "A quiet sleep episode should not last more than 50 minutes. Beyond this, prolonged reduced variability raises concern." },
      { heading: "Why does cycling matter?", text: "Cycling is one of the most reassuring CTG features. Its absence should prompt careful reassessment." },
    ],
    images: ["image5_jpg"], imageLabels: ["Cycling: alternation between normal and reduced variability"],
    references: ["Pereira S, et al. Absence of FHR cycling on intrapartum CTG. J Matern Fetal Neonatal Med. 2022;35(25):7980-7985."],
  },
  q4: {
    physiology: { organ: "Central organs — Somatic NS", meaning: "Presence of TRUE accelerations", color: "#10b981", icon: "⚡" },
    title: "TRUE accelerations?",
    sections: [
      { heading: null, text: "Accelerations are abrupt transient increases in FHR above baseline — one of the most reassuring CTG features." },
      { heading: "True acceleration criteria", text: null, bullets: ["Abrupt onset: rise to peak in <30 seconds","Amplitude: >15 bpm above baseline","Duration: >15 seconds but <10 minutes","Must start from and return to a stable baseline"] },
      { heading: "Beware of Spurious Accelerations", text: "Not every rise is a true acceleration. Watch for: bimodal peaks (M-shaped), shoulders of variable decelerations, overshoots, sloping cliff sign, and double mountain peak sign." },
    ],
    images: ["image2_jpg"], imageLabels: ["True acceleration: abrupt onset, amplitude >15 bpm"],
    references: ["Al Fahdi B, Chandraharan E. True vs spurious intrapartum FHR accelerations. Glob J Reprod Med. 2020;7(5):555722."],
  },
  q5: {
    physiology: { organ: "Placenta — Utero-placental insufficiency", meaning: "Absence of repetitive shallow or late decelerations", color: "#f59e0b", icon: null, iconSvg: PLACENTA_SVG },
    title: "Repetitive shallow or late decelerations?",
    sections: [
      { heading: null, text: "Decelerations must have amplitude >15 bpm and duration >15 seconds to be clinically significant." },
      { heading: "Physiological purpose", text: "Decelerations are primarily a protective reflex — slowing the heart reduces myocardial oxygen consumption." },
      { heading: "Late decelerations", text: "Most concerning pattern:", bullets: ["Gradual onset (slow decline to nadir)","Gradual return to baseline","Reduced or increased variability within the deceleration"] },
      { heading: "Shallow decelerations", text: "In traces with absent accelerations and reduced variability, decelerations of only 10–15 bpm suffice to classify as late." },
    ],
    images: ["image6_jpg"], imageLabels: ["Shallow decelerations in context of reduced variability"],
    references: ["Ayres-de-Campos D, et al. FIGO consensus guidelines. Int J Gynaecol Obstet. 2015;131(1):13-24.", "Westgate JA, et al. Intrapartum deceleration in center stage. Am J Obstet Gynecol. 2007;197(3):236.e1-11."],
  },
};

const scenarios = [
  { id:1, accepted:{q1:["yes"],q2:["yes"],q3:["yes"],q4:["yes"],q5:["no"]}, diagnosis:"FIT FOR LABOUR", diagnosisDetail:null, context:null, management:["FIT FOR LABOUR"], color:"#22c55e", icon:"✓" },
  { id:2, accepted:{q1:["yes","higher"],q2:["yes","reduced","zigzag","atypical sinusoidal"],q3:["yes","no"],q4:["spurious"],q5:["yes","no"]}, diagnosis:"RUPI", diagnosisDetail:null, context:"Reduced fetal movements", management:["No further stress","Immediate C section","Notify pediatricians"], color:"#ef4444", icon:"⚠" },
  { id:3, accepted:{q1:["higher"],q2:["typical sinusoidal"],q3:["no"],q4:["no"],q5:["no"]}, diagnosis:"CHRONIC ANEMIA", diagnosisDetail:"(Early stage)", context:"Reduced fetal movements", management:["No further stress","Immediate C section","Notify pediatricians"], color:"#f97316", icon:"⚠" },
  { id:4, accepted:{q1:["lower"],q2:["typical sinusoidal"],q3:["no"],q4:["no"],q5:["no"]}, diagnosis:"CHRONIC ANEMIA", diagnosisDetail:"(Late stage)", context:"Reduced fetal movements", management:["No further stress","Immediate C section","Notify pediatricians"], color:"#f97316", icon:"⚠" },
  { id:5, accepted:{q1:["yes","no"],q2:["yes","reduced","zigzag","atypical sinusoidal"],q3:["no"],q4:["no"],q5:["no"]}, diagnosis:"FETO MATERNAL HEMORRHAGE", diagnosisDetail:null, context:"Vaginal bleeding, reduced fetal movements", management:["No further stress","Immediate C section","Notify pediatricians"], color:"#dc2626", icon:"⚠" },
  { id:6, accepted:{q1:["higher"],q2:["reduced"],q3:["no"],q4:["no"],q5:["no"]}, diagnosis:"CHRONIC HYPOXIA", diagnosisDetail:"(or Feto Maternal Hemorrhage)", context:"Vaginal bleeding, reduced fetal movements", management:["No further stress","Immediate C section","Notify pediatricians"], color:"#ef4444", icon:"⚠" },
  { id:7, accepted:{q1:["yes"],q2:["atypical sinusoidal"],q3:["yes","no"],q4:["yes"],q5:["no"]}, diagnosis:"FIT FOR LABOUR", diagnosisDetail:"(Pseudo-atypical sinusoidal)", context:"Glottic movements at ultrasound", management:["FIT FOR LABOUR"], color:"#22c55e", icon:"✓" },
  { id:8, accepted:{q1:["higher"],q2:["reduced"],q3:["no"],q4:["no"],q5:["yes","no"]}, diagnosis:"CHRONIC HYPOXIA", diagnosisDetail:"(or Antenatal Stroke)", context:"Reduced fetal movements", management:["No further stress","Immediate C section","Notify pediatricians"], color:"#ef4444", icon:"⚠" },
  { id:9, accepted:{q1:["lower"],q2:["reduced"],q3:["no"],q4:["no"],q5:["yes"]}, diagnosis:"CHRONIC HYPOXIA", diagnosisDetail:"(Pre-terminal)", context:"Reduced fetal movements", management:["No further stress","Immediate C section","Notify pediatricians"], color:"#dc2626", icon:"⚠" },
  { id:10, accepted:{q1:["higher"],q2:["yes","zigzag","atypical sinusoidal"],q3:["no"],q4:["yes","spurious"],q5:["no"]}, diagnosis:"CHORIOAMNIONITIS", diagnosisDetail:null, context:"Maternal pyrexia, meconium, PROM, cervical sweep", management:["No further stress","Immediate C section","Notify pediatricians"], color:"#a855f7", icon:"⚠" },
  { id:11, accepted:{q1:["higher"],q2:["reduced"],q3:["yes","no"],q4:["yes","no"],q5:["no"]}, diagnosis:"SUPRA VENTRICULAR TACHYCARDIA", diagnosisDetail:null, context:"Reduced fetal movements", management:["No further stress","Notify fetal medicine unit","Notify pediatricians"], color:"#8b5cf6", icon:"⚠" },
];

const questions = [
  { id:"q1", num:1, organ:"🫀 Myocardium", organColor:"#7c3aed", text:"Baseline FHR STABLE and APPROPRIATE for gestational age?", options:[{value:"yes",label:"YES — Stable and Appropriate"},{value:"higher",label:"NO — Higher than expected"},{value:"lower",label:"NO — Lower than expected"}] },
  { id:"q2", num:2, organ:"🧠 Autonomic NS", organColor:"#0ea5e9", text:"NORMAL variability?", options:[{value:"yes",label:"YES — Normal (5–25 bpm)"},{value:"reduced",label:"NO — Reduced (<5 bpm)"},{value:"zigzag",label:"NO — Zigzag (>25 bpm)"},{value:"typical sinusoidal",label:"NO — Typical sinusoidal"},{value:"atypical sinusoidal",label:"NO — Atypical sinusoidal"}] },
  { id:"q3", num:3, organ:"🧠 Autonomic NS", organColor:"#0ea5e9", text:"CYCLING present?", options:[{value:"yes",label:"YES"},{value:"no",label:"NO"}] },
  { id:"q4", num:4, organ:"⚡ Somatic NS", organColor:"#10b981", text:"TRUE accelerations?", options:[{value:"yes",label:"YES — True accelerations"},{value:"no",label:"NONE"},{value:"spurious",label:"SPURIOUS only"}] },
  { id:"q5", num:5, organ:"Placental reserve", organIcon:PLACENTA_SVG, organColor:"#f59e0b", text:"Repetitive shallow or late decelerations?", options:[{value:"yes",label:"YES"},{value:"no",label:"NO"}] },
];

function matchScenario(answers) {
  const total = 5;
  const ABNORMAL_Q2 = ["reduced","zigzag","typical sinusoidal","atypical sinusoidal"];
  function isEligible(s) {
    if (s.id === 1 && ABNORMAL_Q2.includes(answers.q2)) return false;
    return true;
  }
  let bestScore = -1;
  for (const s of scenarios) { if (!isEligible(s)) continue; let score = 0; for (const [qid, accepted] of Object.entries(s.accepted)) { if (accepted.includes(answers[qid])) score++; } if (score > bestScore) bestScore = score; }
  const winners = [];
  for (const s of scenarios) { if (!isEligible(s)) continue; let score = 0; for (const [qid, accepted] of Object.entries(s.accepted)) { if (accepted.includes(answers[qid])) score++; } if (score === bestScore) winners.push(s); }
  return { scenarios: winners, score: bestScore, total, tied: winners.length > 1 };
}

function HelpModal({ questionId, onClose }) {
  const help = helpContent[questionId];
  if (!help) return null;
  const getImg = k => k === "baseline_stable" ? BASELINE_IMAGES.stable : k === "baseline_unstable1" ? BASELINE_IMAGES.unstable1 : k === "baseline_unstable2" ? BASELINE_IMAGES.unstable2 : IMAGES[k];
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(0,0,0,0.6)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#fff",border:"1px solid rgba(100,80,200,0.2)",borderRadius:20,padding:"32px 28px",maxWidth:660,width:"100%",maxHeight:"88vh",overflowY:"auto",boxShadow:"0 25px 80px rgba(100,80,200,0.2)",animation:"fadeSlideIn 0.3s ease forwards"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
          <div><div style={{fontSize:10,letterSpacing:"0.25em",color:"#5b3fcf",textTransform:"uppercase",marginBottom:6}}>📖 Clinical Reference</div><h3 style={{color:"#1e1a3c",fontWeight:"bold",fontSize:17,margin:0,lineHeight:1.4,fontFamily:"Georgia,serif"}}>{help.title}</h3></div>
          <button onClick={onClose} style={{background:"#f5f0ff",border:"1px solid rgba(100,80,200,0.2)",color:"#5b3fcf",borderRadius:8,cursor:"pointer",width:32,height:32,fontSize:16,flexShrink:0,marginLeft:16,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>
        <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(100,80,200,0.25),transparent)",marginBottom:16}}/>
        {help.physiology && (<div style={{background:`${help.physiology.color}12`,border:`1.5px solid ${help.physiology.color}44`,borderRadius:12,padding:"12px 16px",marginBottom:20,display:"flex",alignItems:"flex-start",gap:12}}>{help.physiology.iconSvg?<img src={help.physiology.iconSvg} alt="" style={{width:28,height:28,objectFit:"contain",flexShrink:0}}/>:<span style={{fontSize:22,flexShrink:0}}>{help.physiology.icon}</span>}<div><div style={{fontSize:10,letterSpacing:"0.2em",textTransform:"uppercase",color:help.physiology.color,fontWeight:"bold",marginBottom:4}}>What this question evaluates</div><div style={{fontSize:13,color:"#1e1a3c",fontWeight:"bold",marginBottom:2}}>{help.physiology.organ}</div><div style={{fontSize:12,color:"#4a4070",fontStyle:"italic"}}>Normal sign: {help.physiology.meaning}</div></div></div>)}
        <div style={{display:"flex",flexDirection:"column",gap:20}}>{help.sections.map((s,i)=>(<div key={i}>{s.heading&&<div style={{fontSize:13,fontWeight:"bold",color:"#3b2d8a",fontFamily:"Georgia,serif",marginBottom:8,paddingLeft:10,borderLeft:"3px solid #6d4fcc"}}>{s.heading}</div>}{s.text&&<p style={{color:"#3d3060",lineHeight:1.75,margin:"0 0 8px",fontSize:13.5,fontFamily:"Georgia,serif"}}>{s.text}</p>}{s.bullets&&<ul style={{margin:"0 0 0 8px",padding:"0 0 0 16px",display:"flex",flexDirection:"column",gap:5}}>{s.bullets.map((b,j)=><li key={j} style={{color:"#3d3060",fontSize:13.5,lineHeight:1.6,fontFamily:"Georgia,serif"}}>{b}</li>)}</ul>}</div>))}</div>
        {help.images?.length>0&&(<div style={{marginTop:28}}><div style={{fontSize:10,letterSpacing:"0.2em",color:"#8b7cc0",textTransform:"uppercase",marginBottom:14}}>Illustrations</div><div style={{display:"flex",flexDirection:"column",gap:18}}>{help.images.map((k,i)=>(<div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:7}}><img src={getImg(k)} alt={help.imageLabels?.[i]||""} style={{maxWidth:"100%",borderRadius:10,border:"1px solid rgba(100,80,200,0.15)",objectFit:"contain",boxShadow:"0 2px 12px rgba(100,80,200,0.08)"}}/>{help.imageLabels?.[i]&&<span style={{fontSize:11,color:"#8b7cc0",fontStyle:"italic",textAlign:"center"}}>{help.imageLabels[i]}</span>}</div>))}</div></div>)}
        {help.references?.length>0&&(<div style={{marginTop:28,paddingTop:20,borderTop:"1px solid rgba(100,80,200,0.12)"}}><div style={{fontSize:10,letterSpacing:"0.2em",color:"#8b7cc0",textTransform:"uppercase",marginBottom:12}}>References</div><div style={{display:"flex",flexDirection:"column",gap:8}}>{help.references.map((r,i)=>(<div key={i} style={{display:"flex",gap:10,alignItems:"flex-start"}}><span style={{flexShrink:0,width:20,height:20,background:"rgba(100,80,200,0.12)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:"bold",color:"#5b3fcf",marginTop:2}}>{i+1}</span><span style={{fontSize:11,color:"#6b5ea8",lineHeight:1.6,fontFamily:"Georgia,serif",fontStyle:"italic"}}>{r}</span></div>))}</div></div>)}
      </div>
    </div>
  );
}

function ResultView({ result, questions, answers, restart }) {
  return (<div style={{textAlign:"center"}}>
    {result.tied ? (<div>
      <div style={{fontSize:36,marginBottom:12}}>⚖️</div>
      <div style={{fontSize:12,letterSpacing:"0.2em",color:"#8b7cc0",textTransform:"uppercase",marginBottom:16}}>{result.scenarios.length} possible diagnoses — {result.score}/{result.total} criteria matched</div>
      <div style={{background:"#fffbeb",border:"1.5px solid #f59e0b",borderRadius:12,padding:"14px 16px",marginBottom:20,textAlign:"left"}}><div style={{fontSize:13,fontWeight:"bold",color:"#92400e",marginBottom:6}}>⚠ The CTG pattern alone cannot differentiate these diagnoses.</div><div style={{fontSize:13,color:"#78350f",lineHeight:1.6}}>Review the <strong>clinical context</strong> listed under each diagnosis below (maternal signs, fetal movements, bleeding, fever, PROM…) to determine which scenario best fits your patient.</div></div>
      <div style={{display:"flex",flexDirection:"column",gap:16,marginBottom:20}}>{result.scenarios.map(s=>(<div key={s.id} style={{background:`${s.color}10`,border:`2px solid ${s.color}66`,borderRadius:16,padding:"20px",textAlign:"left"}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><span style={{fontSize:24}}>{s.icon==="✓"?"✅":"🚨"}</span><div><div style={{color:s.color,fontWeight:"bold",fontSize:16}}>{s.diagnosis}</div>{s.diagnosisDetail&&<div style={{color:"#6b5ea8",fontSize:12}}>{s.diagnosisDetail}</div>}</div></div>{s.context&&<div style={{background:"#f5f0ff",borderRadius:8,padding:"8px 12px",fontSize:12,color:"#5b3fcf",fontStyle:"italic",marginBottom:10}}>🔍 Context: {s.context}</div>}<div style={{fontSize:11,letterSpacing:"0.15em",color:"#8b7cc0",textTransform:"uppercase",marginBottom:6}}>Management</div><div style={{display:"flex",flexDirection:"column",gap:4}}>{s.management.map((m,i)=>(<div key={i} style={{background:`${s.color}18`,borderRadius:8,padding:"7px 12px",fontSize:13,color:"#1e1a3c",display:"flex",alignItems:"center",gap:8}}><span style={{color:s.color}}>›</span>{m}</div>))}</div></div>))}</div>
      <div style={{textAlign:"left",marginBottom:20}}><div style={{fontSize:11,letterSpacing:"0.2em",color:"#8b7cc0",textTransform:"uppercase",marginBottom:10}}>Your Answers</div><div style={{display:"flex",flexDirection:"column",gap:5}}>{questions.map(q=>{const a=answers[q.id];const l=(q.options.find(o=>o.value===a)||{}).label||(a?a.toUpperCase():"");return(<div key={q.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:"#fafaff",borderRadius:8,padding:"7px 12px",border:"1px solid rgba(100,80,200,0.12)"}}><span style={{fontSize:12,color:"#4a4070",flex:1}}>{q.text}</span><span style={{fontSize:11,fontWeight:"bold",color:"#5b3fcf",marginLeft:8,whiteSpace:"nowrap"}}>{l}</span></div>);})}  </div></div>
    </div>) : ((()=>{const s=result.scenarios[0];return(<div>
      <div style={{fontSize:52,marginBottom:16,filter:`drop-shadow(0 0 20px ${s.color})`}}>{s.icon==="✓"?"✅":"🚨"}</div>
      <div style={{display:"inline-block",background:`${s.color}22`,border:`1.5px solid ${s.color}66`,borderRadius:12,padding:"6px 18px",fontSize:11,letterSpacing:"0.2em",color:s.color,marginBottom:16,textTransform:"uppercase"}}>{result.score===result.total?"Most Probable Diagnosis":"Closest Matching Diagnosis"}</div>
      <h2 style={{color:s.color,fontSize:22,fontWeight:"bold",margin:"0 0 4px"}}>{s.diagnosis}</h2>
      {s.diagnosisDetail&&<p style={{color:"#6b5ea8",fontSize:14,margin:"0 0 12px"}}>{s.diagnosisDetail}</p>}
      {s.context&&<div style={{background:"#f5f0ff",borderRadius:10,padding:"10px 16px",marginBottom:16,fontSize:13,color:"#5b3fcf",fontStyle:"italic"}}>Clinical context: {s.context}</div>}
      {result.score<result.total&&((()=>{const qL={q1:"Baseline FHR",q2:"Variability",q3:"Cycling",q4:"Accelerations",q5:"Decelerations"};const mm=questions.filter(q=>{const e=s.accepted[q.id];return e&&!e.includes(answers[q.id]);});return(<div style={{background:"#fffbeb",border:"1.5px solid #f59e0b",borderRadius:12,padding:"14px 16px",marginBottom:16,textAlign:"left"}}><div style={{fontSize:12,fontWeight:"bold",color:"#92400e",marginBottom:8}}>⚠ Imperfect match — {result.total-result.score} criteria differ:</div>{mm.map(q=>{const e=s.accepted[q.id];return(<div key={q.id} style={{fontSize:12,color:"#78350f",marginBottom:4,paddingLeft:8,borderLeft:"2px solid #f59e0b"}}><strong>{qL[q.id]}</strong>: you answered <strong>{(answers[q.id]||"").toUpperCase()}</strong>, expected <strong>{e.join(" or ").toUpperCase()}</strong></div>);})} <div style={{fontSize:11,color:"#92400e",marginTop:10,fontStyle:"italic"}}>Closest match. Consider diverging criteria clinically.</div></div>);})())}
      <div style={{height:1,background:"rgba(100,80,200,0.12)",margin:"16px 0"}}/>
      <div style={{fontSize:11,letterSpacing:"0.2em",color:"#8b7cc0",textTransform:"uppercase",marginBottom:12}}>Management</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>{s.management.map((m,i)=>(<div key={i} style={{background:`${s.color}18`,border:`1px solid ${s.color}44`,borderRadius:10,padding:"10px 16px",color:"#1e1a3c",fontSize:14,textAlign:"left",display:"flex",alignItems:"center",gap:10}}><span style={{color:s.color,fontSize:16}}>›</span>{m}</div>))}</div>
      <div style={{marginBottom:20}}><div style={{fontSize:11,letterSpacing:"0.15em",color:"#8b7cc0",textTransform:"uppercase",marginBottom:8}}>Match Score</div><div style={{background:"rgba(100,80,200,0.12)",borderRadius:8,height:8,overflow:"hidden"}}><div style={{height:"100%",width:`${Math.round((result.score/result.total)*100)}%`,background:`linear-gradient(90deg,${s.color}88,${s.color})`,borderRadius:8,transition:"width 1s ease"}}/></div><div style={{fontSize:12,color:"#8b7cc0",marginTop:6}}>{result.score}/{result.total} criteria matched</div></div>
      <div style={{textAlign:"left",marginBottom:24}}><div style={{fontSize:11,letterSpacing:"0.2em",color:"#8b7cc0",textTransform:"uppercase",marginBottom:12}}>Your Answers</div><div style={{display:"flex",flexDirection:"column",gap:6}}>{questions.map(q=>{const a=answers[q.id];const e=s.accepted[q.id];const m=e&&e.includes(a);const l=(q.options.find(o=>o.value===a)||{}).label||(a?a.toUpperCase():"");return(<div key={q.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:m?"#f0fdf4":"#fafaff",borderRadius:8,padding:"8px 12px",border:`1px solid ${m?"rgba(34,197,94,0.3)":"rgba(239,68,68,0.2)"}`}}><span style={{fontSize:12,color:"#4a4070",flex:1}}>{q.text}</span><span style={{fontSize:11,fontWeight:"bold",color:m?"#16a34a":"#dc2626",marginLeft:8,whiteSpace:"nowrap"}}>{m?"✓":"◈"} {l}</span></div>);})}  </div></div>
    </div>);})())}
    <button onClick={restart} style={{background:"linear-gradient(135deg,#7c3aed,#a78bfa)",border:"none",color:"#fff",padding:"14px 36px",borderRadius:12,cursor:"pointer",fontSize:15,fontFamily:"Georgia,serif",letterSpacing:"0.05em",marginTop:8}}>↻ New Assessment</button>
  </div>);
}

export default function App() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [step, setStep] = useState(0);
  const [helpOpen, setHelpOpen] = useState(false);
  const currentQ = questions[step-1];
  function handleAnswer(val) { const na={...answers,[currentQ.id]:val}; setAnswers(na); if(step<5){setStep(step+1);}else{setResult(matchScenario(na));setStep(6);} }
  function restart() { setAnswers({}); setResult(null); setStep(0); }

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#f0f4ff,#e8eef8,#f5f0ff)",fontFamily:"Georgia,serif",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"20px"}}>
      <style>{`@keyframes fadeSlideIn{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}.btn-option{background:#f8f6ff;border:1.5px solid rgba(100,80,200,0.2);color:#1e1a3c;padding:14px 28px;border-radius:12px;cursor:pointer;font-size:15px;font-family:'Georgia',serif;letter-spacing:0.05em;transition:all 0.2s ease;width:100%;text-align:left}.btn-option:hover{background:#ede9ff;border-color:rgba(100,80,200,0.5);transform:translateX(6px)}.help-btn{background:#ede9ff;border:1px solid rgba(100,80,200,0.35);color:#5b3fcf;border-radius:50%;width:32px;height:32px;cursor:pointer;font-size:15px;font-weight:bold;display:flex;align-items:center;justify-content:center;transition:all 0.2s;flex-shrink:0;font-family:sans-serif}.help-btn:hover{background:#ddd6fe;transform:scale(1.1);box-shadow:0 0 12px rgba(100,80,200,0.25)}.card{animation:fadeSlideIn 0.5s ease forwards}`}</style>
      {helpOpen&&currentQ&&<HelpModal questionId={currentQ.id} onClose={()=>setHelpOpen(false)}/>}
      <div style={{marginBottom:32,textAlign:"center"}}><div style={{fontSize:13,letterSpacing:"0.25em",color:"#7c6db5",textTransform:"uppercase",marginBottom:6}}>Fetal CTG Assessment Tool</div><h1 style={{fontSize:26,color:"#1e1a3c",fontWeight:"normal",margin:0}}>Is This Fetus Fit for Labour?</h1><div style={{width:60,height:2,background:"linear-gradient(90deg,transparent,#a78bfa,transparent)",margin:"12px auto 0"}}/></div>
      {step>=1&&step<=5&&(<div style={{width:"100%",maxWidth:580,marginBottom:24}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>{questions.map((q,i)=>(<div key={q.id} style={{flex:1,height:6,borderRadius:3,marginRight:4,background:i<step?"#6d4fcc":"rgba(100,80,200,0.15)",transition:"background 0.3s"}}/>))}</div><div style={{fontSize:12,color:"#8b7cc0",textAlign:"right"}}>Question {step}/5</div></div>)}
      <div className="card" key={step} style={{background:"#fff",borderRadius:20,border:"1px solid rgba(100,80,200,0.15)",boxShadow:"0 8px 40px rgba(100,80,200,0.10)",padding:"40px 36px",maxWidth:580,width:"100%"}}>
        {step===0&&(<div style={{textAlign:"center"}}><p style={{color:"#3d3060",lineHeight:1.7,marginBottom:8}}>Observe <strong style={{color:"#1e1a3c"}}>60 minutes of CTG</strong> at admission, then answer 5 questions.</p><p style={{color:"#7c6db5",fontSize:13,marginBottom:24}}>The tool will identify the most probable diagnosis and recommend management.</p><button onClick={()=>setStep(1)} style={{background:"linear-gradient(135deg,#7c3aed,#a78bfa)",border:"none",color:"#fff",padding:"14px 40px",borderRadius:12,cursor:"pointer",fontSize:16,fontFamily:"Georgia,serif"}}>Begin Assessment →</button>
          <div style={{marginTop:24,background:"rgba(100,80,200,0.05)",borderRadius:12,padding:"14px 16px",textAlign:"left",border:"1px solid rgba(100,80,200,0.12)"}}><div style={{fontSize:10,letterSpacing:"0.2em",color:"#8b7cc0",textTransform:"uppercase",marginBottom:10,textAlign:"center"}}>What we assess</div>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}><tbody>
              <tr style={{verticalAlign:"middle"}}><td style={{color:"#5b3fcf",fontWeight:"bold",paddingBottom:6,paddingRight:8,whiteSpace:"nowrap"}}>🫀 Myocardium</td><td style={{color:"#4a4070",paddingBottom:6}}>Baseline FHR stable and appropriate for GA</td></tr>
              <tr style={{verticalAlign:"middle"}}><td style={{color:"#0ea5e9",fontWeight:"bold",paddingBottom:6,paddingRight:8,whiteSpace:"nowrap"}}>🧠 Autonomic NS</td><td style={{color:"#4a4070",paddingBottom:6}}>Normal variability and presence of cycling</td></tr>
              <tr style={{verticalAlign:"middle"}}><td style={{color:"#10b981",fontWeight:"bold",paddingBottom:6,paddingRight:8,whiteSpace:"nowrap"}}>⚡ Somatic NS</td><td style={{color:"#4a4070",paddingBottom:6}}>Presence of TRUE accelerations</td></tr>
              <tr style={{verticalAlign:"middle"}}><td style={{color:"#f59e0b",fontWeight:"bold",paddingRight:8,paddingBottom:6,whiteSpace:"nowrap"}}><span style={{display:"inline-flex",alignItems:"center",gap:4}}><img src={PLACENTA_SVG} alt="" style={{width:16,height:16,objectFit:"contain",verticalAlign:"middle"}}/> Placental reserve</span></td><td style={{color:"#4a4070",paddingBottom:6}}>Absence of repetitive shallow/late decelerations</td></tr>
              <tr><td colSpan="2" style={{paddingTop:8,borderTop:"1px solid rgba(100,80,200,0.12)"}}></td></tr>
              <tr style={{verticalAlign:"middle"}}><td style={{color:"#64748b",fontWeight:"bold",paddingRight:8,whiteSpace:"nowrap"}}>🩺 Clinical context</td><td style={{color:"#4a4070"}}>Maternal signs, fetal movements, bleeding, fever, PROM…</td></tr>
            </tbody></table>
          </div>
          <p style={{color:"#8b7cc0",fontSize:11,marginTop:16,fontStyle:"italic",lineHeight:1.6,textAlign:"left"}}>Adapted from Pereira S, Chandraharan E. Recognition of chronic hypoxia and pre-existing foetal injury on the cardiotocograph (CTG): Urgent need to think beyond the guidelines. <em>Porto Biomed J.</em> 2017 Jul-Aug;2(4):124-129.</p>
        </div>)}
        {step>=1&&step<=5&&currentQ&&(<div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{display:"inline-block",background:"#ede9ff",color:"#5b3fcf",borderRadius:8,padding:"4px 12px",fontSize:12,letterSpacing:"0.15em"}}>QUESTION {currentQ.num}/5</div>
              {currentQ.organ&&(<div style={{fontSize:11,fontWeight:"bold",color:currentQ.organColor,background:`${currentQ.organColor}18`,border:`1px solid ${currentQ.organColor}44`,borderRadius:8,padding:"4px 10px",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:4}}>{currentQ.organIcon?<img src={currentQ.organIcon} alt="" style={{width:16,height:16,objectFit:"contain"}}/>:null}{currentQ.organ}</div>)}
            </div>
            <button className="help-btn" onClick={()=>setHelpOpen(true)} title="Clinical guidance">?</button>
          </div>
          <h2 style={{color:"#1e1a3c",fontSize:18,fontWeight:"normal",marginBottom:24,lineHeight:1.5}}>{currentQ.text}</h2>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>{currentQ.options.map(opt=>(<button key={opt.value} className="btn-option" onClick={()=>handleAnswer(opt.value)}>{opt.label}</button>))}</div>
          {step>1&&(<button onClick={()=>{setStep(step-1);setAnswers(p=>{const n={...p};delete n[currentQ.id];return n;});}} style={{background:"none",border:"none",color:"#9d8fd4",cursor:"pointer",marginTop:20,fontSize:13,fontFamily:"Georgia,serif"}}>← Previous question</button>)}
        </div>)}
        {step===6&&result&&<ResultView result={result} questions={questions} answers={answers} restart={restart}/>}
      </div>
      <div style={{marginTop:24,opacity:0.4}}><span style={{fontSize:11,color:"#7c6db5",letterSpacing:"0.15em",fontStyle:"italic"}}>Fetal CTG Assessment Tool — TWERIS</span></div>
    </div>
  );
}
