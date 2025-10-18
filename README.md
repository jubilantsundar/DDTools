# DDTools
An interactive sunburst visualization of the drug discovery pipeline from target identification through clinical trials, featuring 100+ curated open-source computational tools.

<img width="815" height="696" alt="image" src="https://github.com/user-attachments/assets/d170df71-554a-491b-9bd0-93465693007b" />

## 🎯 Features

- **6 Drug Discovery Stages**: Target ID → Hit ID → Hit-to-Lead → Lead Optimization → Dev Candidate → Clinical
- **6 Therapeutic Modalities**: Small Molecules, Antibodies, Peptides, PROTACs, Oligonucleotides (ASO/siRNA), ADCs
- **100+ GitHub Repositories**: Curated collection of computational drug discovery tools
- **Interactive Tooltips**: Hover descriptions for all methods
- **Modality-Specific Workflows**: Each modality shows relevant techniques and tools

## 🚀 Live Demo

**[View Interactive Chart](https://jubilantsundar.github.io/ddtools/)**

## 📖 How to Use

1. **Start**: Click **"1. Target ID"** to explore target identification methods
2. **Select Modality**: Click **"2. Hit ID"** and choose your therapeutic modality
3. **Explore Tools**: Click any Hit ID method to see curated GitHub repositories
4. **Learn More**: Hover over methods for brief descriptions
5. **Visit Repos**: All GitHub links open in new tabs

## 🛠️ Technologies

- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **SVG** - Graphics rendering
- **No Build Required** - Pure client-side, works directly in browsers

## 💻 Local Development

Simply open `index.html` in your browser. No build process or dependencies required!
```bash
git clone https://github.com/jubilantsundar/ddtools.git
cd ddtools
# Open index.html in your browser
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Adding New Tools

1. Fork this repository
2. Edit `app.jsx`
3. Add your tool to the appropriate `githubRepos` section:
```javascript
'YourMethod': [
  { 
    name: 'Tool Name', 
    url: 'https://github.com/user/repo', 
    desc: 'Brief description under 60 chars' 
  }
]
```

4. Submit a pull request

### Contribution Guidelines

- ✅ Must be open-source and on GitHub
- ✅ Actively maintained (recent commits)
- ✅ Relevant to computational drug discovery
- ✅ Clear, concise description (< 60 characters)
- ✅ Working, valid GitHub URL

## 📚 Categories Covered

### Small Molecules
- High-Throughput Screening (HTS)
- 2D Analog Search
- 3D Shape-Based Virtual Screening
- Pharmacophore Modeling
- Fast Docking
- Fragment-Based Drug Design
- DNA-Encoded Libraries (DEL)
- Natural Products

### Biologics
- Antibodies (Phage Display, Hybridoma, etc.)
- Peptides (Libraries, Rational Design, etc.)
- PROTACs (E3 Ligase, Linker Design, etc.)
- Oligonucleotides (ASO/siRNA)
- Antibody-Drug Conjugates (ADCs)

## 📝 License

MIT License - free to use for educational and commercial purposes.

See [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

Created to help the drug discovery community discover and utilize open-source computational tools. Special thanks to all the developers maintaining these amazing projects.

## 📧 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/jubilantsundar/drug-discovery-pipeline/issues)
- **Discussions**: [GitHub Discussions](https://github.com/jubilantsundar/drug-discovery-pipeline/discussions)
- **Pull Requests**: Always welcome!

## ⭐ Star History

If you find this useful, please star the repository to help others discover it!

---

**Built with ❤️ for the drug discovery community**

MIT License

Copyright (c) 2025 [jubilantsundar]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
