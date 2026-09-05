from manim import *

class PositionalEncodingScene(Scene):
    def construct(self):
        # 1. Create a Word and its Token
        word = Text("Transformer").scale(1.5).shift(UP * 2)
        self.play(FadeIn(word))
        self.wait(1)

        # 2. Convert to Embedding Vector
        vector_elements = [["0.25"], ["-0.13"], ["0.88"], ["0.45"]]
        embedding_matrix = Matrix(vector_elements).next_to(word, DOWN, buff=1)
        embedding_label = Text("Word Embedding", color=BLUE_D).scale(0.8).next_to(embedding_matrix, LEFT, buff=0.5)
        
        self.play(Write(embedding_matrix), Write(embedding_label))
        self.wait(1)

        # 3. Create Positional Encoding Vector (Sine/Cosine values)
        pos_elements = [["0.84"], ["0.54"], ["0.99"], ["0.14"]]
        pos_matrix = Matrix(pos_elements).next_to(embedding_matrix, RIGHT, buff=2)
        pos_label = Text("Positional Encoding", color=YELLOW_D).scale(0.8).next_to(pos_matrix, RIGHT, buff=0.5)
        plus_sign = MathTex("+").move_to((embedding_matrix.get_center() + pos_matrix.get_center()) / 2).scale(1.5)

        self.play(Write(plus_sign))
        self.play(Write(pos_matrix), Write(pos_label))
        self.wait(1)

        # 4. Add them together
        final_elements = [["1.09"], ["0.41"], ["1.87"], ["0.59"]]
        final_matrix = Matrix(final_elements).move_to(embedding_matrix.get_center())
        final_label = Text("Contextualized Embedding", color=TEAL_D).scale(0.8).next_to(final_matrix, LEFT, buff=0.5)

        self.play(
            FadeOut(word),
            FadeOut(plus_sign),
            FadeOut(pos_matrix),
            FadeOut(pos_label),
            Transform(embedding_matrix, final_matrix),
            Transform(embedding_label, final_label)
        )
        self.wait(2)

class QKVGenerationScene(Scene):
    def construct(self):
        title = Text("Generating Query, Key, and Value").to_edge(UP).scale(1.1)
        self.play(Write(title))
        self.wait(1)

        # Contextualized Embedding
        embedding = Matrix([["x_1"], ["x_2"], ["x_3"], ["x_4"]]).shift(LEFT * 5)
        emb_label = Text("Contextualized\nEmbedding (x)", color=TEAL_D).scale(0.6).next_to(embedding, DOWN)
        self.play(Write(embedding), Write(emb_label))
        self.wait(1)

        # W_Q Weight Matrix
        w_q = Matrix([["W_{11}", "W_{12}", "W_{13}", "W_{14}"], ["W_{21}", "W_{22}", "W_{23}", "W_{24}"]]).shift(LEFT * 1)
        w_q_label = Text("Weight Matrix (W_Q)", color=WHITE).scale(0.6).next_to(w_q, DOWN)

        eq = MathTex("\\times").scale(1.5).move_to((embedding.get_center() + w_q.get_center()) / 2)
        
        self.play(Write(w_q), Write(w_q_label), Write(eq))
        self.wait(1)

        # Resulting Query Vector
        arrow = Arrow(LEFT, RIGHT).next_to(w_q, RIGHT)
        q_vector = Matrix([["q_1"], ["q_2"]]).next_to(arrow, RIGHT)
        q_label = Text("Query Vector (Q)", color=RED_D).scale(0.6).next_to(q_vector, DOWN)

        self.play(Write(arrow))
        self.play(Write(q_vector), Write(q_label))
        self.wait(2)

        # Quick transition to show K and V are generated the same way
        k_label = Text("Key Vector (K)", color=YELLOW_D).scale(0.6).move_to(q_label)
        v_label = Text("Value Vector (V)", color=BLUE_D).scale(0.6).move_to(q_label)
        
        w_k_label = Text("Weight Matrix (W_K)", color=WHITE).scale(0.6).move_to(w_q_label)
        w_v_label = Text("Weight Matrix (W_V)", color=WHITE).scale(0.6).move_to(w_q_label)

        self.play(Transform(w_q_label, w_k_label), Transform(q_label, k_label))
        self.wait(1)
        self.play(Transform(w_q_label, w_v_label), Transform(q_label, v_label))
        self.wait(2)


class QKVAttentionScene(Scene):
    def construct(self):
        title = Text("Self-Attention: Q, K, V").to_edge(UP).scale(1.2)
        self.play(Write(title))
        self.wait(1)

        # Create Q, K, V Matrices
        q_label = Text("Query (Q)", color=RED_D).scale(0.8)
        k_label = Text("Key (K)", color=YELLOW_D).scale(0.8)
        v_label = Text("Value (V)", color=BLUE_D).scale(0.8)

        q_matrix = Matrix([["q_1"], ["q_2"]]).next_to(q_label, DOWN)
        k_matrix = Matrix([["k_1", "k_2"]]).next_to(k_label, DOWN)
        v_matrix = Matrix([["v_1"], ["v_2"]]).next_to(v_label, DOWN)

        q_group = VGroup(q_label, q_matrix).shift(LEFT * 4 + UP)
        k_group = VGroup(k_label, k_matrix).shift(UP)
        v_group = VGroup(v_label, v_matrix).shift(RIGHT * 4 + UP)

        self.play(FadeIn(q_group), FadeIn(k_group), FadeIn(v_group))
        self.wait(1)

        # Dot product Q and K
        dot_product_text = MathTex("\\frac{Q \\cdot K^T}{\\sqrt{d_k}}", color=WHITE).scale(1.2).shift(DOWN * 1.5)
        self.play(Write(dot_product_text))
        
        # Move Q and K to combine
        self.play(
            q_matrix.copy().animate.next_to(dot_product_text, LEFT, buff=0.5),
            k_matrix.copy().animate.next_to(dot_product_text, RIGHT, buff=0.5)
        )
        self.wait(1)

        # Softmax
        softmax_text = MathTex("\\text{Softmax}\\left(", "\\frac{Q \\cdot K^T}{\\sqrt{d_k}}", "\\right)").scale(1.2).shift(DOWN * 1.5)
        softmax_text[1].set_color(YELLOW_D)
        
        self.play(Transform(dot_product_text, softmax_text))
        self.wait(1)

        # Final Attention Output
        final_eq = MathTex("\\text{Attention} = ", "\\text{Softmax}\\left(\\frac{Q \\cdot K^T}{\\sqrt{d_k}}\\right)", "\\cdot V").scale(1.2).shift(DOWN * 3)
        final_eq[2].set_color(BLUE_D)

        self.play(Write(final_eq))
        self.wait(2)


class MaskedAttentionScene(Scene):
    def construct(self):
        title = Text("Decoder: Masked Self-Attention").to_edge(UP).scale(1.2)
        self.play(Write(title))
        self.wait(1)

        # Raw scores matrix
        scores = [
            ["1.2", "3.4", "0.5"],
            ["0.8", "2.1", "4.5"],
            ["0.1", "1.1", "3.0"]
        ]
        scores_matrix = Matrix(scores).shift(LEFT * 3)
        scores_label = Text("Raw Scores (Q*K)", color=YELLOW_D).scale(0.6).next_to(scores_matrix, UP)

        self.play(Write(scores_matrix), Write(scores_label))
        self.wait(1)

        # The Mask
        mask = [
            ["0", "-\\infty", "-\\infty"],
            ["0", "0", "-\\infty"],
            ["0", "0", "0"]
        ]
        mask_matrix = Matrix(mask).shift(RIGHT * 3)
        mask_label = Text("Look-Ahead Mask", color=RED_D).scale(0.6).next_to(mask_matrix, UP)

        plus = MathTex("+").scale(1.5).move_to(ORIGIN)

        self.play(Write(mask_matrix), Write(mask_label), Write(plus))
        self.wait(1)

        # Masked Scores
        masked_scores = [
            ["1.2", "-\\infty", "-\\infty"],
            ["0.8", "2.1", "-\\infty"],
            ["0.1", "1.1", "3.0"]
        ]
        masked_matrix = Matrix(masked_scores).move_to(scores_matrix)
        masked_label = Text("Masked Scores", color=TEAL_D).scale(0.6).next_to(masked_matrix, UP)

        self.play(
            FadeOut(plus),
            FadeOut(mask_matrix),
            FadeOut(mask_label),
            Transform(scores_matrix, masked_matrix),
            Transform(scores_label, masked_label)
        )
        self.wait(1)

        # Softmax Application
        arrow = Arrow(LEFT, RIGHT).next_to(scores_matrix, RIGHT)
        softmax_label = Text("Softmax", color=WHITE).scale(0.6).next_to(arrow, UP)

        final_probs = [
            ["1.0", "0.0", "0.0"],
            ["0.21", "0.79", "0.0"],
            ["0.04", "0.12", "0.84"]
        ]
        probs_matrix = Matrix(final_probs).next_to(arrow, RIGHT)
        probs_label = Text("Attention Weights", color=GREEN_D).scale(0.6).next_to(probs_matrix, UP)

        self.play(Write(arrow), Write(softmax_label))
        self.play(Write(probs_matrix), Write(probs_label))
        
        # Highlight the 0.0s where -infinity used to be
        zeros = VGroup(
            probs_matrix.get_entries()[1],
            probs_matrix.get_entries()[2],
            probs_matrix.get_entries()[5]
        )
        self.play(zeros.animate.set_color(RED_D))
        
        self.wait(2)
