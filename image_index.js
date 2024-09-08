import { exec } from 'child_process';
const testt = "⁠Meu nome é Yoshikage Kira. Tenho 33 anos. Minha casa fica na parte nordeste de Morioh, onde todas as casas estão, e eu não sou casado. Eu trabalho como funcionário das lojas de departamentos Kame Yu e chego em casa todos os dias às oito da noite, no máximo. Eu não fumo, mas ocasionalmente bebo. Estou na cama às 23 horas e me certifico de ter oito horas de sono, não importa o que aconteça. Depois de tomar um copo de leite morno e fazer cerca de vinte minutos de alongamentos antes de ir para a cama, geralmente não tenho problemas para dormir até de manhã. Assim como um bebê, eu acordo sem nenhum cansaço ou estresse pela manhã. Foi-me dito que não houve problemas no meu último check-up. Estou tentando explicar que sou uma pessoa que deseja viver uma vida muito tranquila. Eu cuido para não me incomodar com inimigos, como ganhar e perder, isso me faria perder o sono à noite. É assim que eu lido com a sociedade e sei que é isso que me traz felicidade. Embora, se eu fosse lutar, não perderia para ninguém."
// Função para executar comandos do ImageMagick usando exec
function runCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Erro ao executar o comando: ${error.message}`);
                reject(error);
            } else if (stderr) {
                console.error(`Erro no comando: ${stderr}`);
                reject(stderr);
            } else {
                resolve(stdout);
            }
        });
    });
}
function wrapText(text, maxLineLength) {
    const words = text.split(' '); // Quebra o texto em palavras
    let currentLine = '';
    let contagem = 0
    const result = [];

    words.forEach((word) => {
        // Se a linha atual mais a nova palavra exceder o limite, adiciona a linha ao resultado e começa uma nova linha
        if ((currentLine + word).length > maxLineLength) {
            result.push(currentLine.trim()); // Remove espaços em branco extras
            currentLine = ''; // Inicia uma nova linha
            contagem++
        }
        currentLine += word + ' '; // Adiciona a palavra à linha atual
    });

    // Adiciona a última linha
    if (currentLine.trim()) {
        result.push(currentLine.trim());
    }

    return [result.join('\\n'), contagem]; // Junta todas as linhas com quebras de linha
}

let [texto,contagem] = wrapText(testt, 30)

const desenhar = async (frame) => {
    const width = 800
    const height = 600

    // await runCommand(`magick -size ${width}x${height} xc:none -gravity north -pointsize 52 -fill yellow \
    //   -font Arial -annotate +0-${frame-600} "${texto}" \
    //   text.png`)
    // await runCommand(`magick text.png -alpha set -virtual-pixel none \
    //     -distort Perspective "0,0 ${width * 2 / 5 - 1},${height / 3}   ${width},0 ${width * 3 / 5 + 1},${height / 3}   0,${height} 0,${height}   ${width},${height} ${width},${height}" text.png `)
    await runCommand(`magick -size ${width}x${height} xc:none none.png`)

    // await runCommand(`magick -size 800x600 gradient:black-none gradient.png`)

    // await runCommand(`magick gradient.png -fill black -stroke none -draw "rectangle 0,0 800,100" gradient.png"`)

    // await runCommand(`magick composite -compose copy -gravity north stars.png image.png -alpha on image.png`)
    // await runCommand(`magick composite -compose over -gravity north text.png stars.png -alpha on -colorspace RGB frames/frame${frame}.png`)
    // await runCommand(`magick composite -compose over -gravity north gradient.png image.png -alpha on frames/frame${frame}.png`)
}

let frame = 0
for (let i = 0; i < 1; i++) {
    await desenhar(i)
    console.log("feito frame ",i)
    frame++
}