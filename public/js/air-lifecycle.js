(function(){
  var VIEWS = {
    msn7842:{
      msn:'MSN 7842',reg:'EC-MKL',
      sub:'<span>A320-214</span><span class="div">·</span><span><b>Iberia Express</b> · wet lease</span><span class="div">·</span><span>Lease return <b>Q1 2027</b></span><span class="div">·</span><span>Rolling forward view</span>',
      legR:'6 ACTIVE TRACKS · <b>1 AIRCRAFT</b> · 14 FORWARD EVENTS',
      tracks:[
        {name:'Airframe · C-Check',sub:'last 2024-08 · cycle 9,840',bars:[{cls:'green-dim',l:0,w:70,t:'Within limits'},{cls:'green-solid',l:70,w:14,t:'C-Check',flag:'MILESTONE'},{cls:'green-dim',l:84,w:16,t:'Post-check'}]},
        {name:'Engine 1 · LLP set',sub:'CFM56-5B · 18,340 cyc remain',bars:[{cls:'amber-dim',l:0,w:50,t:'Approaching limit'},{cls:'amber-solid',l:50,w:18,t:'Shop visit'},{cls:'green-dim',l:68,w:32,t:'Restored'}]},
        {name:'Engine 2 · shop visit',sub:'CFM56-5B · 9 days perf delta',bars:[{cls:'red-dim',l:0,w:30,t:'Risk window'},{cls:'red-solid',l:30,w:18,t:'Unplanned SV'},{cls:'green-dim',l:48,w:52,t:'Monitoring'}]},
        {name:'APU · LCF',sub:'42 LCF remain',bars:[{cls:'green-dim',l:0,w:80,t:'Within limits'},{cls:'amber-dim',l:80,w:20,t:'Approaching'}]},
        {name:'AD compliance',sub:'AD 2024-08-13 open',bars:[{cls:'green-dim',l:0,w:45,t:'Compliant'},{cls:'amber-solid',l:45,w:10,t:'AD 2024-08'},{cls:'green-dim',l:55,w:45,t:'Compliant'}]},
        {name:'Lease return',sub:'conditions matrix review',bars:[{cls:'teal-dim',l:0,w:88,t:'Monitoring'},{cls:'teal-solid',l:88,w:12,t:'Review window'}]}
      ],
      alerts:[
        {dot:'#22C55E',name:'Airframe',when:'8.5 months',tone:'#86EFAC',body:'C-Check scheduled · within limits'},
        {dot:'#F59E0B',name:'Engine 1',when:'6.0 months',tone:'#FCD34D',body:'LLP limit reached · action window open'},
        {dot:'#EF4444',name:'Engine 2',when:'3.5 months',tone:'#FCA5A5',body:'Unplanned shop visit risk · 9d perf delta'},
        {dot:'#00C4CC',name:'Lease return',when:'11 months',tone:'#00C4CC',body:'Conditions matrix review window'}
      ]
    },
    msn6291:{
      msn:'MSN 6291',reg:'EI-FVL',
      sub:'<span>Boeing 737-800</span><span class="div">·</span><span><b>Ryanair</b> · wet lease</span><span class="div">·</span><span>Redelivery in <b>42 days</b></span><span class="div">·</span><span>Action required</span>',
      legR:'6 ACTIVE TRACKS · <b>1 AIRCRAFT</b> · 9 FORWARD EVENTS',
      tracks:[
        {name:'Airframe · records',sub:'reconciliation pass',bars:[{cls:'amber-solid',l:0,w:14,t:'Reconcile',flag:'42d'},{cls:'green-dim',l:14,w:86,t:'Post-handback'}]},
        {name:'Engine 1 · LLP',sub:'CFM56-7B · closed',bars:[{cls:'green-dim',l:0,w:100,t:'Compliant'}]},
        {name:'Engine 2 · LLP',sub:'CFM56-7B · 1 stage pending',bars:[{cls:'red-dim',l:0,w:14,t:'Open'},{cls:'green-dim',l:14,w:86,t:'Resolved'}]},
        {name:'Cabin records',sub:'STC docs missing',bars:[{cls:'red-solid',l:0,w:14,t:'Open finding',flag:'AUDIT'},{cls:'green-dim',l:14,w:86,t:'Closed'}]},
        {name:'AD compliance',sub:'2 ADs pending sign-off',bars:[{cls:'amber-dim',l:0,w:14,t:'Pending'},{cls:'green-dim',l:14,w:86,t:'Compliant'}]},
        {name:'Redelivery handover',sub:'lessee inspection window',bars:[{cls:'teal-solid',l:0,w:14,t:'Handover',flag:'Q2 2026'},{cls:'teal-dim',l:14,w:86,t:'Next lessee'}]}
      ],
      alerts:[
        {dot:'#EF4444',name:'Cabin records',when:'42 days',tone:'#FCA5A5',body:'STC documentation gap · audit risk'},
        {dot:'#EF4444',name:'Engine 2 LLP',when:'42 days',tone:'#FCA5A5',body:'Stage 3 disc certificate pending'},
        {dot:'#F59E0B',name:'AD sign-off',when:'42 days',tone:'#FCD34D',body:'2 ADs awaiting lessee sign-off'},
        {dot:'#00C4CC',name:'Handover',when:'42 days',tone:'#00C4CC',body:'Lessee inspection window opens'}
      ]
    },
    fleet:{
      msn:'All fleet',reg:'5 aircraft',
      sub:'<span><b>5 aircraft</b> across 3 lessees</span><span class="div">·</span><span>2 in redelivery window</span><span class="div">·</span><span>1 unplanned shop visit risk</span><span class="div">·</span><span>11 active commitments</span>',
      legR:'11 ACTIVE TRACKS · <b>5 AIRCRAFT</b> · 47 FORWARD EVENTS',
      tracks:[
        {name:'MSN 6291 · 737-800',sub:'EI-FVL · Ryanair',bars:[{cls:'red-solid',l:0,w:14,t:'Redelivery',flag:'42d'},{cls:'teal-dim',l:14,w:86,t:'Next lessee'}]},
        {name:'MSN 7842 · A320-214',sub:'EC-MKL · Iberia Express',bars:[{cls:'red-dim',l:0,w:30,t:'Engine 2 risk'},{cls:'amber-solid',l:50,w:18,t:'Engine 1 SV'},{cls:'green-solid',l:70,w:14,t:'C-Check'}]},
        {name:'MSN 8104 · A321neo',sub:'CC-AZA · LATAM',bars:[{cls:'green-dim',l:0,w:60,t:'Within limits'},{cls:'green-solid',l:60,w:12,t:'A-Check'},{cls:'green-dim',l:72,w:28,t:'Within limits'}]},
        {name:'MSN 5547 · 737 MAX 8',sub:'PR-XMA · GOL',bars:[{cls:'amber-dim',l:0,w:40,t:'LLP approaching'},{cls:'amber-solid',l:40,w:14,t:'Shop visit'},{cls:'green-dim',l:54,w:46,t:'Restored'}]},
        {name:'MSN 9221 · A330-300',sub:'B-LJF · Cathay',bars:[{cls:'green-dim',l:0,w:78,t:'Within limits'},{cls:'teal-solid',l:78,w:22,t:'Lease review',flag:'Q1 2027'}]}
      ],
      alerts:[
        {dot:'#EF4444',name:'MSN 6291',when:'42 days',tone:'#FCA5A5',body:'Redelivery · action required'},
        {dot:'#EF4444',name:'MSN 7842 / Eng 2',when:'3.5 months',tone:'#FCA5A5',body:'Unplanned shop visit risk'},
        {dot:'#F59E0B',name:'MSN 5547 / Eng',when:'5.0 months',tone:'#FCD34D',body:'LLP shop visit scheduled'},
        {dot:'#00C4CC',name:'MSN 9221',when:'9.5 months',tone:'#00C4CC',body:'Lease review window opens'}
      ]
    }
  };
  VIEWS.more = VIEWS.fleet;

  function render(key){
    var v = VIEWS[key] || VIEWS.fleet;
    document.getElementById('lc-msn').innerHTML = v.msn + '<span class="reg">'+v.reg+'</span>';
    document.getElementById('lc-sub').innerHTML = v.sub;
    document.getElementById('lc-tracks').innerHTML = v.tracks.map(function(tr){
      var bars = tr.bars.map(function(b){
        var flag = b.flag ? '<div class="lc-flag" style="left:0;">'+b.flag+'</div>' : '';
        return '<div class="lc-bar '+b.cls+'" style="left:'+b.l+'%;width:'+b.w+'%;">'+flag+b.t+'</div>';
      }).join('');
      return '<div class="lc-track"><div class="lc-track-l"><div class="lc-track-name">'+tr.name+'</div><div class="lc-track-sub">'+tr.sub+'</div></div><div class="lc-bar-area">'+bars+'</div></div>';
    }).join('');
    document.getElementById('lc-foot').innerHTML = v.alerts.map(function(a){
      return '<div class="lc-alert"><div class="lc-alert-dot" style="background:'+a.dot+';"></div><div class="lc-alert-text"><b style="color:'+a.tone+';">'+a.name+'</b>'+a.body+'<span class="when">'+a.when+'</span></div></div>';
    }).join('');
    document.getElementById('lc-leg-r').innerHTML = v.legR;
  }

  // The msn7842 view (the default tab) is already pre-rendered in the static
  // markup, so no initial render() call here — calling it on load would
  // overwrite the SSR content and race React's hydration check for this
  // subtree. render() only runs from here on, in response to a tab click.
  document.querySelectorAll('.lc-tab').forEach(function(tab){
    tab.addEventListener('click', function(){
      document.querySelectorAll('.lc-tab').forEach(function(t){t.classList.remove('active');});
      tab.classList.add('active');
      render(tab.getAttribute('data-view'));
    });
  });
})();
