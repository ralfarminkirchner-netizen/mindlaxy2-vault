(() => {
  const payload = window.RAKI_INDEX;
  const repos = payload.repositories;
  const families = payload.manifest.counts.by_family;
  const familySelect = document.querySelector('#family');
  const search = document.querySelector('#search');
  const visibility = document.querySelector('#visibility');
  const evidence = document.querySelector('#evidence');
  const results = document.querySelector('#results');
  const resultCount = document.querySelector('#result-count');
  const template = document.querySelector('#card-template');

  const familyTitles = new Map(repos.map(r => [r.primary_family, r.family_title]));
  [...Object.keys(families)].sort((a,b) => familyTitles.get(a).localeCompare(familyTitles.get(b), 'de'))
    .forEach(id => {
      const o = document.createElement('option');
      o.value = id;
      o.textContent = `${familyTitles.get(id)} (${families[id]})`;
      familySelect.append(o);
    });

  const m = payload.manifest;
  document.querySelector('#stats').innerHTML = [
    ['Repositories', m.scope.github_repository_count],
    ['öffentlich', m.scope.public_repository_count],
    ['privat', m.scope.private_repository_count],
    ['Legacy-Ordner', m.scope.legacy_local_observation_count],
  ].map(([label,value]) => `<span class="stat"><strong>${value}</strong> ${label}</span>`).join('');

  const evidenceLabels = {
    'source-described':'Quelle gelesen',
    'historical-handoff':'historischer Handoff',
    'repository-observed':'Repo / Template',
    'title-and-context-derived':'Titel/Kontext-Deutung'
  };

  function docPath(r) {
    const slug = r.name.replace(/[^A-Za-z0-9._-]+/g,'-').replace(/^-|-$/g,'') || 'repo';
    return `../docs/repositories/${r.id}-${slug}.md`;
  }

  function searchable(r) {
    return [
      r.name, r.repository_full_name, r.kind, r.summary, r.status_note,
      r.family_title, ...(r.tags || []), ...(r.boundaries || []),
      ...(r.relations || []).flatMap(x => [x.type, x.target])
    ].join(' ').toLocaleLowerCase('de');
  }

  function render() {
    const q = search.value.trim().toLocaleLowerCase('de');
    const rows = repos.filter(r =>
      (!q || searchable(r).includes(q)) &&
      (!familySelect.value || r.primary_family === familySelect.value) &&
      (!visibility.value || r.visibility === visibility.value) &&
      (!evidence.value || r.evidence.level === evidence.value)
    );
    rows.sort((a,b) => a.name.localeCompare(b.name,'de',{sensitivity:'base'}));
    results.replaceChildren();
    rows.forEach(r => {
      const node = template.content.cloneNode(true);
      node.querySelector('h2').textContent = r.name;
      node.querySelector('.family-pill').textContent = r.family_title;
      const vis = node.querySelector('.visibility-pill');
      vis.textContent = r.visibility === 'public' ? 'öffentlich' : 'privat';
      vis.classList.add(r.visibility);
      node.querySelector('.kind').textContent = r.kind;
      node.querySelector('.summary').textContent = r.summary;
      node.querySelector('.status').textContent = r.declared_or_index_status;
      node.querySelector('.evidence').textContent = evidenceLabels[r.evidence.level] || r.evidence.level;
      node.querySelector('.ceiling').textContent = r.evidence.claim_ceiling;
      const bl = node.querySelector('.boundaries');
      (r.boundaries.length ? r.boundaries : ['Keine zusätzliche Grenze dokumentiert.']).forEach(x => {
        const li = document.createElement('li'); li.textContent = x; bl.append(li);
      });
      const rl = node.querySelector('.relations');
      (r.relations.length ? r.relations : [{type:'none',target:'—',status:'—'}]).forEach(x => {
        const li = document.createElement('li');
        li.textContent = `${x.type} → ${x.target} (${x.status})`;
        rl.append(li);
      });
      const repoLink = node.querySelector('.repo-link');
      repoLink.href = r.url;
      repoLink.textContent = r.visibility === 'public' ? 'GitHub öffnen' : 'GitHub · Zugriff nötig';
      node.querySelector('.doc-link').href = docPath(r);
      results.append(node);
    });
    resultCount.textContent = `${rows.length} von ${repos.length} Repositories`;
  }

  [search, familySelect, visibility, evidence].forEach(el => el.addEventListener('input', render));
  document.querySelector('#reset').addEventListener('click', () => {
    search.value = ''; familySelect.value = ''; visibility.value = ''; evidence.value = ''; render(); search.focus();
  });
  render();
})();
