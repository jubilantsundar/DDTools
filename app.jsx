const { useState } = React;

const DrugDiscoverySunburst = () => {
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedModality, setSelectedModality] = useState(null);
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [showModalitySelector, setShowModalitySelector] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showGithubRepos, setShowGithubRepos] = useState(false);
  const [hoveredMethod, setHoveredMethod] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showLegend, setShowLegend] = useState(true);

  const modalities = [
    { id: 'small-mol', name: 'Small Molecules', color: '#EC4899', icon: '○' },
    { id: 'antibody', name: 'Antibodies', color: '#8B5CF6', icon: 'Y' },
    { id: 'peptide', name: 'Peptides', color: '#06B6D4', icon: '~' },
    { id: 'protac', name: 'PROTACs', color: '#F59E0B', icon: '⚯' },
    { id: 'oligonucleotide', name: 'Oligos (ASO/siRNA)', color: '#10B981', icon: '≋' },
    { id: 'adc', name: 'ADCs', color: '#EF4444', icon: 'Y○' }
  ];

  const githubRepos = {
    'small-mol': {
      'HTS': [
        { name: 'MF-PCBA', url: 'https://github.com/davidbuterez/mf-pcba', desc: 'Multi-fidelity modeling for HTS data' },
        { name: 'ChemicalChecker', url: 'https://github.com/sbnb-irb/chemical_checker', desc: 'Bioactivity signature analysis' },
        { name: 'KNIME-ITMP', url: 'https://github.com/Fraunhofer-ITMP/KNIME', desc: 'Drug discovery workflows for HTS' },
        { name: 'Pycytominer', url: 'https://github.com/cytomining/pycytominer', desc: 'Processing HTS image data' }
      ],
      'Analog Search': [
        { name: 'RDKit', url: 'https://github.com/rdkit/rdkit', desc: '2D similarity search and fingerprints' },
        { name: 'FPSim2', url: 'https://github.com/chembl/FPSim2', desc: 'Fast similarity searching' }
      ],
      'Shape-Based VS': [
        { name: 'VSFlow', url: 'https://github.com/czodrowskilab/VSFlow', desc: 'Shape-based virtual screening workflow' },
        { name: 'ShapeDB', url: 'https://github.com/dkoes/shapedb', desc: 'Shape database for screening' },
        { name: 'SENSAAS', url: 'https://github.com/SENSAAS/sensaas', desc: 'Shape and electrostatic similarity' },
        { name: 'RGMolSA', url: 'https://github.com/RPirie96/RGMolSA', desc: 'Molecular shape alignment' }
      ],
      'Pharmacophore': [
        { name: 'Pharmit', url: 'https://github.com/dkoes/pharmit', desc: 'Pharmacophore search and modeling' },
        { name: 'OpenPharmacophore', url: 'https://github.com/uibcdf/OpenPharmacophore', desc: 'Pharmacophore modeling toolkit' }
      ],
      'Fast Docking': [
        { name: 'GNINA', url: 'https://github.com/gnina/gnina', desc: 'Fast CNN-based docking for VS and AL' },
        { name: 'Vina-GPU', url: 'https://github.com/DeltaGroupNJUPT/Vina-GPU-2.0', desc: 'GPU-accelerated Vina for large libraries' }
      ],
      'Fragment-Based': [
        { name: 'FragmentKnitwork', url: 'https://github.com/stephwills/FragmentKnitwork', desc: 'Fragment network analysis' },
        { name: 'Fragmenstein', url: 'https://github.com/matteoferla/Fragmenstein', desc: 'Fragment merging and linking' },
        { name: 'FREED', url: 'https://github.com/AITRICS/FREED', desc: 'Fragment-based drug design with deep learning' },
        { name: 'f-RAG', url: 'https://github.com/NVlabs/f-RAG', desc: 'Fragment-based molecule generation' },
        { name: 'CReM', url: 'https://github.com/DrrDom/crem', desc: 'Chemical space exploration from fragments' }
      ],
      'DEL': [
        { name: 'DELi', url: 'https://github.com/Popov-Lab-UNC/DELi', desc: 'DEL data analysis toolkit' },
        { name: 'DECL-Gen', url: 'https://github.com/Gillingham-Lab/DECL-Gen', desc: 'DNA-encoded library generator' }
      ],
      'Natural Products': [
        { name: 'NPClassifier', url: 'https://github.com/mwang87/NP-Classifier', desc: 'Natural product classification' },
        { name: 'NPAtlas', url: 'https://github.com/NPAtlas/npatlas_website', desc: 'Natural products database' },
        { name: 'COCONUT', url: 'https://github.com/Steinbeck-Lab/coconut', desc: 'Collection of natural compounds' },
        { name: 'NP3 MS Workflow', url: 'https://github.com/danielatrivella/NP3_MS_Workflow', desc: 'Natural product mass spec analysis' }
      ]
    },
    'antibody': {
      'Phage Display': [
        { name: 'AbLang', url: 'https://github.com/oxpig/AbLang', desc: 'Antibody language model' },
        { name: 'ANARCI', url: 'https://github.com/oxpig/ANARCI', desc: 'Antibody numbering' },
        { name: 'SAbDab', url: 'https://github.com/oxpig/sabdab-sabpred', desc: 'Antibody structure database' }
      ],
      'Hybridoma': [
        { name: 'IgBLAST', url: 'https://github.com/ncbi/igblast', desc: 'Immunoglobulin sequence analysis' },
        { name: 'IMGT Tools', url: 'https://github.com/crowelab/SONAR', desc: 'Antibody lineage analysis' }
      ],
      'B-cell Screening': [
        { name: 'IgBLAST', url: 'https://github.com/ncbi/igblast', desc: 'Ig sequence alignment' },
        { name: 'Change-O', url: 'https://github.com/immcantation/changeo', desc: 'B-cell repertoire analysis' },
        { name: 'Immunarch', url: 'https://github.com/immunomind/immunarch', desc: 'Immune repertoire analysis' }
      ],
      'Yeast Display': [
        { name: 'AbLang', url: 'https://github.com/oxpig/AbLang', desc: 'Language model for antibodies' },
        { name: 'Rosetta', url: 'https://github.com/RosettaCommons/rosetta', desc: 'Protein design suite' }
      ],
      'Immunization': [
        { name: 'IgBLAST', url: 'https://github.com/ncbi/igblast', desc: 'Sequence analysis tool' },
        { name: 'IMGT/V-QUEST', url: 'https://github.com/crowelab/SONAR', desc: 'Variable domain analysis' }
      ]
    },
    'peptide': {
      'Peptide Libraries': [
        { name: 'PeptideBuilder', url: 'https://github.com/mtien/PeptideBuilder', desc: 'Generate peptide structures' },
        { name: 'Modlamp', url: 'https://github.com/alexarnimueller/modlAMP', desc: 'Antimicrobial peptide design' },
        { name: 'DeepPeptide', url: 'https://github.com/jiangdada1221/DeepPeptide', desc: 'Deep learning for peptides' }
      ],
      'Phage Display': [
        { name: 'PeptideBuilder', url: 'https://github.com/mtien/PeptideBuilder', desc: 'Peptide structure builder' },
        { name: 'BioPython', url: 'https://github.com/biopython/biopython', desc: 'Sequence analysis tools' }
      ],
      'SPOT Synthesis': [
        { name: 'PeptideBuilder', url: 'https://github.com/mtien/PeptideBuilder', desc: 'Synthetic peptide modeling' },
        { name: 'Modlamp', url: 'https://github.com/alexarnimueller/modlAMP', desc: 'Peptide analysis toolkit' }
      ],
      'Rational Design': [
        { name: 'RFdiffusion', url: 'https://github.com/RosettaCommons/RFdiffusion', desc: 'AI-based protein/peptide design' },
        { name: 'PepINVENT', url: 'https://github.com/MolecularAI/PepINVENT', desc: 'De novo peptide design with RL' },
        { name: 'EvoBind', url: 'https://github.com/patrickbryant1/EvoBind', desc: 'Evolution-based binder design' }
      ],
      'mRNA Display': [
        { name: 'BioPython', url: 'https://github.com/biopython/biopython', desc: 'Sequence analysis' },
        { name: 'ViennaRNA', url: 'https://github.com/ViennaRNA/ViennaRNA', desc: 'RNA structure prediction' }
      ]
    },
    'protac': {
      'E3 Ligase Selection': [
        { name: 'PROTAC-DB', url: 'https://github.com/simonfqy/PROTAC-DB', desc: 'PROTAC database' },
        { name: 'DeepPROTACs', url: 'https://github.com/chimianbuhetang/DeepPROTACs', desc: 'AI-based PROTAC design' }
      ],
      'Warhead ID': [
        { name: 'RDKit', url: 'https://github.com/rdkit/rdkit', desc: 'Molecular fingerprinting' },
        { name: 'DeepChem', url: 'https://github.com/deepchem/deepchem', desc: 'ML for molecule design' }
      ],
      'Linker Design': [
        { name: 'PROTAC-Model', url: 'https://github.com/lol88/PROTAC-Model', desc: 'PROTAC modeling tools' },
        { name: 'RDKit', url: 'https://github.com/rdkit/rdkit', desc: 'Linker enumeration' },
        { name: 'DeepPROTACs', url: 'https://github.com/chimianbuhetang/DeepPROTACs', desc: 'Linker optimization' }
      ],
      'Binary Complex': [
        { name: 'AutoDock Vina', url: 'https://github.com/ccsb-scripps/AutoDock-Vina', desc: 'Protein-ligand docking' },
        { name: 'PRosettaC', url: 'https://github.com/RosettaCommons/rosetta', desc: 'PROTAC modeling' }
      ],
      'Ternary Complex': [
        { name: 'AlphaFold-Multimer', url: 'https://github.com/deepmind/alphafold', desc: 'Complex structure prediction' },
        { name: 'PRosettaC', url: 'https://github.com/RosettaCommons/rosetta', desc: 'Ternary complex modeling' }
      ]
    },
    'oligonucleotide': {
      'Target Selection': [
        { name: 'BioPython', url: 'https://github.com/biopython/biopython', desc: 'Sequence analysis tools' },
        { name: 'BLAST', url: 'https://github.com/ncbi/blast', desc: 'Sequence alignment' },
        { name: 'ViennaRNA', url: 'https://github.com/ViennaRNA/ViennaRNA', desc: 'RNA secondary structure' }
      ],
      'Sequence Design': [
        { name: 'ViennaRNA', url: 'https://github.com/ViennaRNA/ViennaRNA', desc: 'RNA folding prediction' },
        { name: 'NUPACK', url: 'https://github.com/beliveau-lab/NUPACK', desc: 'Nucleic acid design' },
        { name: 'OligoArrayAux', url: 'https://github.com/qiime/oligotyping', desc: 'Oligo design tools' }
      ],
      'Chemistry Selection': [
        { name: 'RNAstructure', url: 'https://github.com/gnye8/RNAstructure', desc: 'RNA structure prediction' },
        { name: 'ViennaRNA', url: 'https://github.com/ViennaRNA/ViennaRNA', desc: 'Chemical modification analysis' }
      ],
      'Silencing Screen': [
        { name: 'BioPython', url: 'https://github.com/biopython/biopython', desc: 'Genomic analysis' },
        { name: 'CRISPR Tools', url: 'https://github.com/fengzhanglab/Screening_Protocols_manuscript', desc: 'Screen analysis' }
      ]
    },
    'adc': {
      'Antibody Selection': [
        { name: 'AbLang', url: 'https://github.com/oxpig/AbLang', desc: 'Antibody ML model' },
        { name: 'SAbDab', url: 'https://github.com/oxpig/sabdab-sabpred', desc: 'Antibody database' },
        { name: 'IgBLAST', url: 'https://github.com/ncbi/igblast', desc: 'Antibody sequence analysis' }
      ],
      'Payload ID': [
        { name: 'RDKit', url: 'https://github.com/rdkit/rdkit', desc: 'Small molecule analysis' },
        { name: 'DeepChem', url: 'https://github.com/deepchem/deepchem', desc: 'Cytotoxic compound screening' }
      ],
      'Linker Screen': [
        { name: 'RDKit', url: 'https://github.com/rdkit/rdkit', desc: 'Linker enumeration' },
        { name: 'ADC-Tools', url: 'https://github.com/Merck/ADCDataProcessing', desc: 'ADC data analysis' }
      ],
      'Conjugation Site': [
        { name: 'Rosetta', url: 'https://github.com/RosettaCommons/rosetta', desc: 'Protein engineering' },
        { name: 'PyMOL', url: 'https://github.com/schrodinger/pymol-open-source', desc: 'Structure visualization' }
      ]
    }
  };

  const methodDescriptions = {
    'GWAS': 'Genome-Wide Association Studies identify genetic variants associated with disease',
    'Disease Gene Mapping': 'Identifies genes responsible for genetic diseases',
    'Functional Genomics': 'Studies gene function using high-throughput methods',
    'Target Validation': 'Confirms target modulation produces desired effect',
    'Proteomics': 'Large-scale protein analysis',
    'Mass Spec': 'Mass spectrometry for protein analysis',
    'Biomarker Discovery': 'Identifies disease or drug response indicators',
    'Network Analysis': 'Maps biological networks',
    'Pathway Analysis': 'Studies biological pathways',
    'AI/ML': 'Machine learning for target prediction',
    'Phenotypic Screening': 'Screens for desired cellular phenotype',
    'HCS': 'High-Content Screening with automated microscopy',
    'Animal Models': 'In vivo target validation',
    'Literature Mining': 'Automated literature analysis',
    'ChEMBL': 'Bioactive molecules database',
    'DrugBank': 'Drug and target database',
    'Analog Search': '2D fingerprint-based similarity search for chemical analogs',
    'Shape-Based VS': '3D molecular shape and electrostatic similarity screening',
    'Pharmacophore': 'Screening based on 3D arrangement of chemical features',
    'Fast Docking': 'High-throughput docking for virtual screening and active learning',
    'Med Chem': 'Chemical modifications to improve properties',
    'Scaffold Hop': 'Core structure replacement',
    'Bioisosteres': 'Chemical group substitution',
    'Analog Synthesis': 'Creating structural variants',
    'SAR': 'Structure-Activity Relationship analysis',
    'QSAR': 'Quantitative structure-activity models',
    'R-Group Analysis': 'Systematic substituent variation',
    'IC50': 'Half-maximal inhibitory concentration',
    'Dose-Response': 'Drug dose vs biological effect',
    'Selectivity': 'Testing against related targets',
    'Solubility': 'Aqueous dissolution ability',
    'Caco-2': 'Permeability assay for oral absorption',
    'Microsomal': 'Metabolic stability testing',
    'Crystallography': 'X-ray structure determination',
    'Cryo-EM': 'Cryo-electron microscopy',
    'Structure-Based': 'Drug design using 3D structure',
    'ADME': 'Absorption, Distribution, Metabolism, Excretion',
    'hERG': 'Cardiac safety assay',
    'CYP': 'Cytochrome P450 testing',
    'PK': 'Pharmacokinetics studies',
    'BBB': 'Blood-brain barrier penetration',
    'GLP Tox': 'Good Laboratory Practice toxicology',
    'IND Package': 'Investigational New Drug application',
    'CMC': 'Chemistry, Manufacturing, Controls',
    'FTO': 'Freedom to Operate analysis',
    'Phase I': 'First-in-human safety trials',
    'FIH': 'First-in-Human study',
    'Phase II': 'Proof-of-concept efficacy trials',
    'PoC': 'Proof-of-Concept in patients',
    'Phase III': 'Large confirmatory trials',
    'Pivotal': 'Critical approval trials',
    'NDA': 'New Drug Application',
    'FDA': 'Food and Drug Administration',
    'EMA': 'European Medicines Agency',
    'Phase IV': 'Post-marketing surveillance',
    'REMS': 'Risk Evaluation and Mitigation Strategy'
  };

  const stages = [
    { 
      id: 'target', 
      name: '1. Target ID', 
      color: '#8B5CF6',
      methods: [
        'GWAS', 'Disease Gene Mapping', 'Functional Genomics', 'Target Validation',
        'Proteomics', 'Mass Spec', 'Biomarker Discovery',
        'Network Analysis', 'Pathway Analysis', 'AI/ML',
        'Phenotypic Screening', 'HCS', 'Animal Models',
        'Literature Mining', 'ChEMBL', 'DrugBank'
      ]
    },
    { 
      id: 'hit', 
      name: '2. Hit ID', 
      color: '#3B82F6',
      methods: {
        'small-mol': ['HTS', 'Analog Search', 'Shape-Based VS', 'Pharmacophore', 'Fast Docking', 'Fragment-Based', 'DEL', 'Natural Products'],
        'antibody': ['Phage Display', 'Hybridoma', 'B-cell Screening', 'Yeast Display', 'Immunization'],
        'peptide': ['Peptide Libraries', 'Phage Display', 'SPOT Synthesis', 'Rational Design', 'mRNA Display'],
        'protac': ['E3 Ligase Selection', 'Warhead ID', 'Linker Design', 'Binary Complex', 'Ternary Complex'],
        'oligonucleotide': ['Target Selection', 'Sequence Design', 'Chemistry Selection', 'Silencing Screen'],
        'adc': ['Antibody Selection', 'Payload ID', 'Linker Screen', 'Conjugation Site']
      }
    },
    { 
      id: 'h2l', 
      name: '3. Hit-to-Lead', 
      color: '#06B6D4',
      methods: {
        'small-mol': ['Med Chem', 'SAR', 'Scaffold Hop', 'IC50', 'Solubility', 'Caco-2', 'Microsomal'],
        'antibody': ['Affinity Maturation', 'Humanization', 'CDR Optimization', 'Epitope Mapping', 'Aggregation'],
        'peptide': ['Stapling', 'Cyclization', 'N-methylation', 'Protease Stability', 'Cell Penetration'],
        'protac': ['Linker Optimization', 'Hook Effect', 'Degradation Kinetics', 'E3 Selectivity', 'Cooperativity'],
        'oligonucleotide': ['Chemistry Opt', 'Length Opt', 'Off-Target', 'Silencing Potency', 'Stability'],
        'adc': ['DAR Optimization', 'Linker Stability', 'Payload Potency', 'Conjugation Method', 'Homogeneity']
      }
    },
    { 
      id: 'lead', 
      name: '4. Lead Opt', 
      color: '#10B981',
      methods: {
        'small-mol': ['ADME', 'hERG', 'CYP', 'PK', 'Efficacy', 'Tox', 'BBB', 'Rule of 5'],
        'antibody': ['Effector Function', 'FcRn Binding', 'PK', 'Immunogenicity', 'Manufacturability', 'Stability'],
        'peptide': ['PK Enhancement', 'Formulation', 'Stability', 'Immunogenicity', 'Efficacy Models'],
        'protac': ['PK/PD', 'Tissue Distribution', 'Duration', 'Selectivity Panel', 'In Vivo Degradation'],
        'oligonucleotide': ['Delivery', 'Tissue Distribution', 'Duration', 'Hepatotoxicity', 'Immunostimulation'],
        'adc': ['Bystander Effect', 'PK', 'Therapeutic Window', 'Deconjugation', 'Target Expression']
      }
    },
    { 
      id: 'dev', 
      name: '5. Dev Candidate', 
      color: '#F59E0B',
      methods: {
        'small-mol': ['GLP Tox', 'Salt Selection', 'Polymorphism', 'Scale-Up', 'IND Package', 'Patent'],
        'antibody': ['Cell Line Dev', 'Process Dev', 'Formulation', 'Stability', 'GMP', 'Biosimilar Risk'],
        'peptide': ['Synthesis Scale-Up', 'Formulation', 'Stability', 'CMC', 'Regulatory'],
        'protac': ['GLP Tox', 'Formulation', 'Stability', 'Manufacturing', 'Regulatory Strategy'],
        'oligonucleotide': ['GMP Synthesis', 'Formulation', 'LNP/Conjugate', 'Stability', 'CMC'],
        'adc': ['Process Dev', 'Analytical Methods', 'Stability', 'Potency Assay', 'GMP']
      }
    },
    { 
      id: 'clinic', 
      name: '6. Clinical', 
      color: '#EF4444',
      methods: [
        'Phase I', 'FIH', 'Safety', 'Dose Escalation', 'PK/PD',
        'Phase II', 'PoC', 'Efficacy', 'Biomarkers',
        'Phase III', 'Pivotal', 'Large-Scale', 'Comparative',
        'Regulatory', 'IND', 'NDA', 'FDA', 'EMA',
        'Phase IV', 'Post-Market', 'Real-World', 'REMS'
      ]
    }
  ];

  const centerX = 400;
  const centerY = 400;
  const innerRadius = 140;
  const middleRadius = 240;
  const outerRadius = 380;

  const createArc = (startAngle, endAngle, innerR, outerR) => {
    const startInner = polarToCartesian(centerX, centerY, innerR, startAngle);
    const endInner = polarToCartesian(centerX, centerY, innerR, endAngle);
    const startOuter = polarToCartesian(centerX, centerY, outerR, startAngle);
    const endOuter = polarToCartesian(centerX, centerY, outerR, endAngle);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return [
      `M ${startOuter.x} ${startOuter.y}`,
      `A ${outerR} ${outerR} 0 ${largeArc} 1 ${endOuter.x} ${endOuter.y}`,
      `L ${endInner.x} ${endInner.y}`,
      `A ${innerR} ${innerR} 0 ${largeArc} 0 ${startInner.x} ${startInner.y}`,
      'Z'
    ].join(' ');
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  const getTextPosition = (startAngle, endAngle, radius) => {
    const midAngle = (startAngle + endAngle) / 2;
    return polarToCartesian(centerX, centerY, radius, midAngle);
  };

  const handleStageClick = (stageId) => {
    if (stageId === 'target') {
      setSelectedStage(stageId);
      setShowModalitySelector(false);
    } else if (stageId === 'hit' && selectedStage === 'target') {
      setShowModalitySelector(true);
      setSelectedStage(null);
    } else if (selectedModality && stageId !== 'target') {
      setSelectedStage(selectedStage === stageId ? null : stageId);
      setShowModalitySelector(false);
    }
  };

  const handleModalitySelect = (modalityId) => {
    setSelectedModality(modalityId);
    setShowModalitySelector(false);
    setSelectedStage('hit');
  };

  const anglePerStage = 360 / stages.length;

  const getCurrentMethods = (stage) => {
    if (stage.id === 'target' || stage.id === 'clinic') {
      return stage.methods;
    }
    if (selectedModality && typeof stage.methods === 'object') {
      return stage.methods[selectedModality] || [];
    }
    return [];
  };

  const XIcon = () => (
    React.createElement('svg', { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
      React.createElement('line', { x1: "18", y1: "6", x2: "6", y2: "18" }),
      React.createElement('line', { x1: "6", y1: "6", x2: "18", y2: "18" })
    )
  );

  return (
    React.createElement('div', { className: "w-full h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4" },
      React.createElement('div', { className: "relative" },
        React.createElement('svg', { width: "800", height: "800", viewBox: "0 0 800 800" },
          React.createElement('circle', { cx: centerX, cy: centerY, r: innerRadius, fill: "#1e293b" }),
          React.createElement('text', { x: centerX, y: centerY - 30, textAnchor: "middle", className: "fill-white font-bold text-2xl" }, "Drug Discovery"),
          React.createElement('text', { x: centerX, y: centerY - 5, textAnchor: "middle", className: "fill-slate-400 text-base" }, "Pipeline"),
          selectedModality ? [
            React.createElement('text', { key: "mod", x: centerX, y: centerY + 25, textAnchor: "middle", className: "fill-emerald-400 text-sm font-semibold" },
              "Modality: ", modalities.find(m => m.id === selectedModality)?.name
            ),
            React.createElement('text', {
              key: "change",
              x: centerX,
              y: centerY + 45,
              textAnchor: "middle",
              className: "fill-slate-500 text-xs cursor-pointer hover:fill-slate-400",
              onClick: () => {
                setSelectedModality(null);
                setSelectedStage(null);
              }
            }, "(click to change)")
          ] : React.createElement('text', { x: centerX, y: centerY + 25, textAnchor: "middle", className: "fill-slate-500 text-xs" }, "Start with Target ID"),

          stages.map((stage, index) => {
            const startAngle = index * anglePerStage;
            const endAngle = (index + 1) * anglePerStage;
            const path = createArc(startAngle, endAngle, innerRadius, middleRadius);
            const textPos = getTextPosition(startAngle, endAngle, (innerRadius + middleRadius) / 2);
            const isSelected = selectedStage === stage.id;
            const isLocked = !selectedModality && stage.id !== 'target' && stage.id !== 'hit';
            
            const midAngle = (startAngle + endAngle) / 2;
            const textRotation = midAngle - 90;
            const flipText = textRotation > 90 && textRotation < 270;
            const finalRotation = flipText ? textRotation + 180 : textRotation;
            
            return React.createElement('g', { key: stage.id },
              React.createElement('path', {
                d: path,
                fill: stage.color,
                stroke: "white",
                strokeWidth: "2",
                opacity: isLocked ? 0.3 : (isSelected ? 1 : (selectedStage ? 0.3 : 0.9)),
                className: isLocked ? 'cursor-not-allowed' : 'cursor-pointer transition-all duration-300',
                onClick: () => !isLocked && handleStageClick(stage.id),
                onMouseEnter: () => !isLocked && setHoveredSegment(`stage-${stage.id}`),
                onMouseLeave: () => setHoveredSegment(null),
                style: {
                  filter: hoveredSegment === `stage-${stage.id}` ? 'brightness(1.2)' : 'none'
                }
              }),
              React.createElement('text', {
                x: textPos.x,
                y: textPos.y,
                textAnchor: "middle",
                dominantBaseline: "middle",
                className: "fill-white font-semibold text-sm pointer-events-none",
                transform: `rotate(${finalRotation}, ${textPos.x}, ${textPos.y})`
              }, stage.name),
              isLocked && React.createElement('text', {
                x: textPos.x,
                y: textPos.y + 15,
                textAnchor: "middle",
                dominantBaseline: "middle",
                className: "fill-slate-300 text-xs pointer-events-none",
                transform: `rotate(${finalRotation}, ${textPos.x}, ${textPos.y + 15})`
              }, "🔒")
            );
          }),

          selectedStage && !showModalitySelector && stages.map((stage, stageIndex) => {
            if (stage.id !== selectedStage) return null;
            
            const methods = getCurrentMethods(stage);
            if (methods.length === 0) return null;
            
            const stageStartAngle = stageIndex * anglePerStage;
            const stageEndAngle = (stageIndex + 1) * anglePerStage;
            const anglePerMethod = (stageEndAngle - stageStartAngle) / methods.length;
            
            return methods.map((method, methodIndex) => {
              const startAngle = stageStartAngle + (methodIndex * anglePerMethod);
              const endAngle = stageStartAngle + ((methodIndex + 1) * anglePerMethod);
              const path = createArc(startAngle, endAngle, middleRadius, outerRadius);
              const textPos = getTextPosition(startAngle, endAngle, (middleRadius + outerRadius) / 2);
              const textAngle = (startAngle + endAngle) / 2;
              
              const methodColor = stage.color + 'DD';
              const hasGithubRepos = stage.id === 'hit' && selectedModality && githubRepos[selectedModality] && githubRepos[selectedModality][method];
              
              const textRotation = textAngle - 90;
              const flipMethodText = textRotation > 90 && textRotation < 270;
              const finalMethodRotation = flipMethodText ? textRotation + 180 : textRotation;
              
              return React.createElement('g', { key: `${stage.id}-${methodIndex}` },
                React.createElement('path', {
                  d: path,
                  fill: methodColor,
                  stroke: "white",
                  strokeWidth: "1",
                  opacity: 0.95,
                  className: hasGithubRepos ? "transition-all duration-300 cursor-pointer" : "transition-all duration-300",
                  onMouseEnter: (e) => {
                    setHoveredSegment(`method-${stage.id}-${methodIndex}`);
                    if (!hasGithubRepos && methodDescriptions[method]) {
                      setHoveredMethod(method);
                      setTooltipPosition({ x: e.clientX, y: e.clientY });
                    }
                  },
                  onMouseLeave: () => {
                    setHoveredSegment(null);
                    setHoveredMethod(null);
                  },
                  onClick: () => {
                    if (hasGithubRepos) {
                      setSelectedMethod(method);
                      setShowGithubRepos(true);
                    }
                  },
                  style: {
                    filter: hoveredSegment === `method-${stage.id}-${methodIndex}` ? 'brightness(1.3)' : 'none'
                  }
                }),
                React.createElement('text', {
                  x: textPos.x,
                  y: textPos.y,
                  textAnchor: "middle",
                  dominantBaseline: "middle",
                  className: "fill-white font-medium text-xs pointer-events-none",
                  transform: `rotate(${finalMethodRotation}, ${textPos.x}, ${textPos.y})`
                }, method)
              );
            });
          })
        ),

        showModalitySelector && React.createElement('div', { className: "absolute inset-0 flex items-center justify-center" },
          React.createElement('div', { className: "bg-slate-800 bg-opacity-95 backdrop-blur rounded-2xl p-8 shadow-2xl border-2 border-slate-600 max-w-2xl" },
            React.createElement('div', { className: "flex justify-between items-center mb-6" },
              React.createElement('h2', { className: "text-2xl font-bold text-white" }, "Select Drug Modality"),
              React.createElement('button', {
                onClick: () => setShowModalitySelector(false),
                className: "text-slate-400 hover:text-white transition-colors"
              }, React.createElement(XIcon))
            ),
            React.createElement('p', { className: "text-slate-300 mb-6 text-sm" },
              "Choose the therapeutic modality to explore modality-specific methods for Hit ID, Hit-to-Lead, and Lead Optimization stages."
            ),
            React.createElement('div', { className: "grid grid-cols-2 gap-4" },
              modalities.map(modality =>
                React.createElement('button', {
                  key: modality.id,
                  onClick: () => handleModalitySelect(modality.id),
                  className: "p-4 rounded-lg border-2 border-slate-600 hover:border-slate-400 transition-all hover:scale-105 text-left",
                  style: { backgroundColor: modality.color + '20' }
                },
                  React.createElement('div', { className: "flex items-center gap-3 mb-2" },
                    React.createElement('span', { className: "text-3xl" }, modality.icon),
                    React.createElement('span', { className: "font-semibold text-white" }, modality.name)
                  )
                )
              )
            )
          )
        ),

        showGithubRepos && selectedMethod && selectedModality && React.createElement('div', { className: "absolute inset-0 flex items-center justify-center" },
          React.createElement('div', { className: "bg-slate-800 bg-opacity-95 backdrop-blur rounded-2xl p-8 shadow-2xl border-2 border-slate-600 max-w-3xl max-h-[80vh] overflow-y-auto" },
            React.createElement('div', { className: "flex justify-between items-center mb-6" },
              React.createElement('div', null,
                React.createElement('h2', { className: "text-2xl font-bold text-white" }, selectedMethod),
                React.createElement('p', { className: "text-slate-400 text-sm mt-1" },
                  "Open Source Tools for ", modalities.find(m => m.id === selectedModality)?.name
                )
              ),
              React.createElement('button', {
                onClick: () => {
                  setShowGithubRepos(false);
                  setSelectedMethod(null);
                },
                className: "text-slate-400 hover:text-white transition-colors"
              }, React.createElement(XIcon))
            ),
            React.createElement('div', { className: "space-y-3" },
              githubRepos[selectedModality][selectedMethod]?.map((repo, idx) =>
                React.createElement('a', {
                  key: idx,
                  href: repo.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "block p-4 bg-slate-700 hover:bg-slate-600 rounded-lg border border-slate-600 hover:border-blue-400 transition-all group"
                },
                  React.createElement('div', { className: "flex items-start justify-between" },
                    React.createElement('div', { className: "flex-1" },
                      React.createElement('div', { className: "flex items-center gap-2 mb-1" },
                        React.createElement('svg', { className: "w-5 h-5 text-white", fill: "currentColor", viewBox: "0 0 24 24" },
                          React.createElement('path', { d: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" })
                        ),
                        React.createElement('h3', { className: "font-semibold text-white group-hover:text-blue-300 transition-colors" }, repo.name)
                      ),
                      React.createElement('p', { className: "text-slate-300 text-sm" }, repo.desc)
                    ),
                    React.createElement('svg', { className: "w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors flex-shrink-0 ml-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
                      React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" })
                    )
                  )
                )
              )
            )
          )
        ),

        hoveredMethod && methodDescriptions[hoveredMethod] && React.createElement('div', {
          className: "fixed z-50 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-xl border border-slate-600 max-w-xs text-sm pointer-events-none",
          style: {
            left: `${tooltipPosition.x + 10}px`,
            top: `${tooltipPosition.y + 10}px`
          }
        },
          React.createElement('div', { className: "font-semibold mb-1" }, hoveredMethod),
          React.createElement('div', { className: "text-slate-300 text-xs" }, methodDescriptions[hoveredMethod])
        ),

        React.createElement('div', { className: "absolute top-4 left-4 bg-slate-800 bg-opacity-90 rounded-lg p-4 text-white max-w-xs" },
          React.createElement('div', { className: "flex justify-between items-center mb-2" },
            React.createElement('div', { className: "text-sm font-semibold" }, "How to use:"),
            React.createElement('button', {
              onClick: () => setShowLegend(!showLegend),
              className: "text-slate-400 hover:text-white transition-colors text-xs"
            }, showLegend ? 'Hide' : 'Show')
          ),
          showLegend && React.createElement('div', { className: "text-xs space-y-1 text-slate-300" },
            React.createElement('p', null, "1. Click ", React.createElement('strong', null, "1. Target ID"), " to explore methods"),
            React.createElement('p', null, "2. Click ", React.createElement('strong', null, "2. Hit ID"), " to select modality"),
            React.createElement('p', null, "3. Click Hit ID methods for GitHub tools"),
            React.createElement('p', null, "4. Hover over any method for description")
          )
        )
      )
    )
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(DrugDiscoverySunburst));

                                           
