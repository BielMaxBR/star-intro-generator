import ffmpeg from 'fluent-ffmpeg';

ffmpeg.setFfmpegPath("C:\\Users\\el-shaddai\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-7.0-full_build\\bin\\ffmpeg.exe")

const FPS = 24;
const width = 400
const height = 300
const testt = "⁠Meu nome é Yoshikage Kira. Tenho 33 anos. Minha casa fica na parte nordeste de Morioh, onde todas as casas estão, e eu não sou casado. Eu trabalho como funcionário das lojas de departamentos Kame Yu e chego em casa todos os dias às oito da noite, no máximo. Eu não fumo, mas ocasionalmente bebo. Estou na cama às 23 horas e me certifico de ter oito horas de sono, não importa o que aconteça. Depois de tomar um copo de leite morno e fazer cerca de vinte minutos de alongamentos antes de ir para a cama, geralmente não tenho problemas para dormir até de manhã. Assim como um bebê, eu acordo sem nenhum cansaço ou estresse pela manhã. Foi-me dito que não houve problemas no meu último check-up. Estou tentando explicar que sou uma pessoa que deseja viver uma vida muito tranquila. Eu cuido para não me incomodar com inimigos, como ganhar e perder, isso me faria perder o sono à noite. É assim que eu lido com a sociedade e sei que é isso que me traz felicidade. Embora, se eu fosse lutar, não perderia para ninguém."
const copypasta = `Negocio eh q o menino que na virada dos anos 80-90 q tinha essa idade ai (e eh da geração X) e que tinha essa visao careta da vida,  cresceu e hoje é um tiozao de mais de 40 anos e estatisticamente a gente sabe pela demografia que homens brancos que viveram sua infancia/adolescencia nos anos 80-90 são o principal eleitorado de extrema direita. Eu gosto de dizer que a geração coca-cola cresceu e virou os tiozão do zap. Essa galera que ja era de classe media na infancia, pegou o final da ditura enquanto criança de modo a ter uma nostalgia relacionada a um sentimento de segurança, essa galera se formou no neoliberalismo dos anos 90 e por ter familia com grana, tomaram riscos e empreenderam nessa epoca e depois enriqueceram no periodo do milagrinho do PT e ai deram rage quando viram que seriam taxados em uma social democracia e resolveram sabotar esse processo apostando na extrema direita que eles tem identificação afetiva, porque provavelmente os pais deles eram engenheiros ou alguma outra coisa assim que trabalha em obras do regime militar e ganhava muito dinheiro nessa epoca, enquanto a policia massacrava as pessoas que eles nao gostam (por isso a nostalgia com a sensacao de "segurança"). Infelizmente, vamoa precisar ver essa geração emvelhecer e começar usar pijama de madeira para livrar o pais dessa maldição e isso soh vai rolar la pra 2050 e alem.`
const laines = `alto lá amigo, não se deve fazer algo assim comigo`

function wrapText(text, maxLineLength) {
    const words = text.split(' ');
    let currentLine = '';
    let contagem = 0
    const result = [];

    words.forEach((word) => {

        if ((currentLine + word).length > maxLineLength) {
            result.push(currentLine.trim());
            currentLine = '';
            contagem++
        }
        currentLine += word + ' ';
    });


    if (currentLine.trim()) {
        result.push(currentLine.trim());
    }

    return [result.join('\n'), contagem];
}

let [texto, contagem] = wrapText(testt, 34)
console.log(texto)
async function createVideoFromFrames() {
    return new Promise((resolve, reject) => {
        ffmpeg()
            .input("stars.png")
            .input("none.png")
            .complexFilter([
                '[1:v]colorkey=black[v1]',
                {
                    filter: 'drawtext',
                    options: {
                        text: `${texto}`,
                        x: 0,
                        y: `${height*1.80 * 0}-(t*${(height/6)/2.5})`,
                        fontsize: 44,
                        fontcolor: 'yellow',
                        fontfile: 'C:/Windows/Fonts/arialbd.ttf',
                        text_align: "C"
                    },
                    inputs: '[v1]',
                    outputs: 'text_layer'
                },
                {
                    filter: 'perspective',
                    options: {
                        x0: width*2/5,
                        y0: height/6,
                        x1: width*3/5,
                        y1: height/6,
                        x2: -width,
                        y2: width*2,
                        x3: width*2,
                        y3: width*2,
                        sense: "destination"
                    },
                    inputs: '[text_layer]',
                    outputs: 'perspective'
                },
                {
                    filter: 'drawbox',
                    options: {
                        x: 0,
                        y: 0,
                        width: 'iw',
                        height: height/6,
                        color: 'black',
                        thickness: 'fill'
                    },
                    inputs: '[perspective]',
                    outputs: 'black'
                },
                {
                    filter: 'overlay',
                    options: {
                        x: 0,
                        y: 0,
                    },
                    inputs: '[0:v][black]',
                    outputs: 'output'
                }
            ])
            .outputOptions('-map', '[output]') // a tela inteira dá 11 linhas em perspectiva...
            .loop(2.5)//* contagem)
            .noAudio()
            .outputFPS(FPS)
            .output('output.mp4')
            .videoCodec('libx264')
            .outputOptions('-pix_fmt yuv420p') 
            .outputOptions([
                '-crf 30', 
                '-threads 8'                  
              ])
            .on("start", text => console.log(text))
            .on('end', resolve)
            .on('progress', function(info) {
                const seg = 2.5 * contagem
                const min = Math.floor(seg/60)
                const hor = Math.floor(min/60)
                const formatter = new Intl.NumberFormat('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false
                });
                console.log(`progresso ${info.timemark} de ${formatter.format(hor)}:${formatter.format(min)}:${formatter.format(seg%60)}`);
              })
            .on('error', reject)
            .run();
    });
}

async function addAudio() {
    return new Promise((resolve, reject) => {
        ffmpeg()
            .input("output.mp4")
            .input('star_song.mp3')
            .output('final.mp4')
            .outputOptions([
                '-shortest',
                '-map 0:v',
                '-map 1:a',
                '-c copy'
            ])
            .on("start", text => console.log(text))
            .on('end', resolve)
            .on('progress', function(info) {
                console.log('progress ' + info.percent + '%');
              })
            .on('error', reject)
            .run();
    })
}

(async () => {
    try {
        await createVideoFromFrames()
        console.log('Video created successfully.');
        await addAudio();
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
})();


















